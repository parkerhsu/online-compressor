import React, { useState, useRef } from 'react'
import { Button, Upload, message, Slider } from 'antd'
import Progress from '@/components/Progress'
import { PlusOutlined, PlusCircleFilled, ArrowDownOutlined } from '@ant-design/icons'
import { v4 as uuid } from 'uuid'
import axios from '@/utils/axios'
import './index.less'

interface Props {
  type: 'png' | 'gif' | 'pdf'
}

type FileItem = {
  key: string
  file: File
  status: CompressStatus
  originSize?: number
  compressedSize?: number
  ratio?: number
}

enum CompressStatus {
  WAIT = 1,
  COMPRESSING = 2,
  FINISHED = 3
}

const UploadComponent: React.FC<Props> = ({ type }) => {
  const [showUploadList, setShowUploadList] = useState(false)
  const [fileList, setFileList] = useState<FileItem[]>([])
  const [compressStatus, setCompressStatus] = useState<CompressStatus>(CompressStatus.WAIT)
  const [sliderVal, setSliderVal] = useState(0)
  const inputRef = useRef<HTMLInputElement>()

  function triggerInputClick() {
    inputRef.current?.click()
  }

  function handleUpload(e: any) {
    if (!showUploadList) setShowUploadList(true)

    let files = e.target.files
    files = Array.from(files) as Array<File>
    const filesArr = files.map((file: File) => ({
      key: uuid(),
      file,
      status: CompressStatus.WAIT
    }))
    // throttle
    filesArr.forEach((fileItem: FileItem) => beginUpload(fileItem))
    setFileList([...fileList, ...filesArr])
  }

  async function beginUpload(fileItem: FileItem) {
    try {
      const formData = new FormData()
      formData.append('uuid', fileItem.key)
      formData.append('file', fileItem.file)
      formData.append('filename', fileItem.file.name)

      await axios.post('/api/file/upload', formData)
    } catch (e) {
      console.error(e)
    }
  }

  async function beginCompress() {
    try {
      if (compressStatus !== CompressStatus.WAIT) return

      setCompressStatus(CompressStatus.COMPRESSING)
      fileList.forEach((fileItem) => (fileItem.status = CompressStatus.COMPRESSING))
      setFileList([...fileList])
      const quality = getQuality(sliderVal)
      const promises = fileList.map((fileItem, idx) => {
        return new Promise<void>((resolve) => {
          axios.post('/api/file/compress', { key: fileItem.key, quality }).then(({ data }) => {
            fileList[idx].status = CompressStatus.FINISHED
            fileList[idx].originSize = data.origin_size
            fileList[idx].compressedSize = data.compress_size
            fileList[idx].ratio = calcCompressdeRatio(data.origin_size, data.compress_size)
            setFileList([...fileList])
            resolve()
          })
        })
      })
      await Promise.all(promises)
      setCompressStatus(CompressStatus.FINISHED)
    } catch (e) {
      console.error(e)
    }
  }

  async function handleDownloadFile(key: string) {
    try {
      const url = `/api/file/download?key=${key}`
      const el = document.createElement('a')
      el.href = url
      document.body.appendChild(el)
      el.click()
      document.body.removeChild(el)
    } catch (e) {
      console.error(e)
      message.error('compress error')
    }
  }

  async function handleDownloadZip() {
    try {
      const form = document.createElement('form')
      form.style.display = 'none'
      form.action = '/api/file/download-zip'
      form.method = 'post'
      document.body.appendChild(form)
      const inputEl = document.createElement('input')
      inputEl.type = 'hidden'
      inputEl.name = 'keys'
      inputEl.value = String(fileList.map((item) => item.key))
      form.appendChild(inputEl)
      form.submit()
      form.remove()
    } catch (e) {
      console.error(e)
      message.error('download zip error')
    }
  }

  function clearFileList() {
    setFileList([])
    setShowUploadList(false)
    setCompressStatus(CompressStatus.WAIT)
  }

  function formatFileSize(size: number) {
    if (size < 1024 * 100) {
      return `${(size / 1024).toFixed(1)}KB`
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)}MB`
    }
  }

  function calcCompressdeRatio(before: number, current: number) {
    return +((before - current) / before).toFixed(2) * 100
  }

  function calcTotalSize() {
    return fileList.reduce((acc, item) => {
      acc += item.originSize || 0
      return acc
    }, 0)
  }

  function calcTotalCompressedSize() {
    return fileList.reduce((acc, item) => {
      acc += item.compressedSize || 0
      return acc
    }, 0)
  }

  function getAcceptType(type: string) {
    if (type === 'png') {
      return '.jpg,.png,.jpeg'
    } else if (type === 'gif') {
      return '.gif'
    } else if (type === 'pdf') {
      return '.pdf'
    }
  }

  function getQuality(v: number) {
    if (v === 0) {
      return 80
    } else if (v === 50) {
      return 50
    } else if (v === 100) {
      return 30
    }
  }

  function renderTitle(type: string) {
    if (type === 'png') {
      return '图片压缩'
    } else if (type === 'gif') {
      return 'gif压缩'
    } else if (type === 'pdf') {
      return 'pdf压缩'
    }
  }

  function renderTips(type: string) {
    if (type === 'png') {
      return '（最多上传 30 个文件，单个图片最大为 10 M，支持jpg、png格式）'
    } else if (type === 'gif') {
      return '（最多上传 30 个文件，单个图片最大为 10 M，仅支持gif格式）'
    } else if (type === 'pdf') {
      return '最多上传5个文件，单个文件最大为200M'
    }
  }

  function renderCompressInfo() {
    const originTotalSize = calcTotalSize()
    const compressedTotalSize = calcTotalCompressedSize()
    const totalRatio = calcCompressdeRatio(originTotalSize, compressedTotalSize)

    return `${formatFileSize(originTotalSize)} → ${formatFileSize(compressedTotalSize)}，共计压缩 ${totalRatio}%`
  }

  function renderFileList() {
    return fileList.map((item) => {
      const compressStatus = item.status
      const progressType = compressStatus === CompressStatus.COMPRESSING ? 'infinite' : 'line'

      return (
        <div className="list-item" key={item.key}>
          <div className="file-name">
            <span>{item.file.name}</span>
          </div>
          <span style={{ marginRight: '48px' }}>{formatFileSize(item.file.size)}</span>
          <Progress type={progressType} />
          {compressStatus !== CompressStatus.FINISHED && (
            <span className="wait-text ml-48">{compressStatus === CompressStatus.WAIT ? '等待上传' : '处理中'}</span>
          )}
          {compressStatus === CompressStatus.FINISHED && (
            <div className="finished-info ml-48">
              <span>{formatFileSize(item.compressedSize || 0)}</span>
              <span>-{item.ratio}%</span>
              <ArrowDownOutlined className="download-icon" onClick={() => handleDownloadFile(item.key)} />
            </div>
          )}
        </div>
      )
    })
  }

  return (
    <div className="upload-wrapper">
      <input
        type="file"
        multiple
        accept={getAcceptType(type)}
        style={{ display: 'none' }}
        ref={inputRef as any}
        onChange={handleUpload}
      />
      {!showUploadList ? (
        <div className="upload-inner" onClick={triggerInputClick}>
          <div className="plus-box">
            <PlusOutlined className="icon" />
          </div>
          <p className="h1">{renderTitle(type)}</p>
          <p className="sub-tip">{renderTips(type)}</p>
        </div>
      ) : (
        <div className="compress-container">
          <div className="header">
            <span>压缩强度</span>
            <div className="slider-wrapper">
              <Slider
                marks={{ 0: '轻度', 50: '普通', 100: '强力' }}
                tooltipVisible={false}
                tipFormatter={null}
                step={null}
                value={sliderVal}
                onChange={(v) => setSliderVal(v)}
              />
            </div>
            <Button type="primary" onClick={beginCompress}>
              开始压缩
            </Button>
          </div>
          <div className="list-wrapper">{renderFileList()}</div>
          <div className="bottom">
            {compressStatus !== CompressStatus.FINISHED ? (
              <Button onClick={triggerInputClick}>
                <PlusCircleFilled />
                继续上传
              </Button>
            ) : (
              <div className="bottom-info">
                <span>
                  共 {fileList.length} 个文件，完成压缩 {fileList.length} 个， {renderCompressInfo()}
                </span>
                <Button onClick={clearFileList}>清除队列</Button>
                {fileList.length > 1 && (
                  <Button onClick={handleDownloadZip}>
                    <ArrowDownOutlined />
                    打包下载{fileList.length}个文件
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadComponent
