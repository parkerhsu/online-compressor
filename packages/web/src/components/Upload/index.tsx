import React, { useState, useRef } from 'react'
import { Button, Upload, message, Slider } from 'antd'
import Progress from '@/components/Progress'
import type { UploadProps } from 'antd'
import { PlusOutlined, PlusCircleFilled, ArrowDownOutlined } from '@ant-design/icons'
import { v4 as uuid } from 'uuid'
import './index.less'

interface Props {}

type FileItem = {
  key: string
  file: File
}

enum CompressStatus {
  WAIT = 1,
  COMPRESSING = 2,
  FINISHED = 3
}

const UploadComponent: React.FC<Props> = (props) => {
  const [showUploadList, setShowUploadList] = useState(false)
  const [fileList, setFileList] = useState<FileItem[]>([])
  const [compressStatus, setCompressStatus] = useState<CompressStatus>(CompressStatus.WAIT)
  const inputRef = useRef<HTMLInputElement>()
  const progressType = compressStatus === CompressStatus.COMPRESSING ? 'infinite' : 'line'

  function triggerInputClick() {
    inputRef.current?.click()
  }

  function handleUpload(e: any) {
    if (!showUploadList) setShowUploadList(true)

    let files = e.target.files
    files = Array.from(files)
    const filesArr = files.map((file: File) => ({
      key: uuid(),
      file
    }))
    setFileList([...fileList, ...filesArr])
  }

  function beginCompress() {}

  function formatFileSize() {}

  function renderFileList() {
    return fileList.map((item) => (
      <div className="list-item" key={item.key}>
        <div className="file-name">
          <span>{item.file.name}</span>
        </div>
        <span>1.89MB</span>
        <Progress type={progressType} />
        {compressStatus !== CompressStatus.FINISHED && (
          <span>{compressStatus === CompressStatus.WAIT ? '等待上传' : '处理中'}</span>
        )}
        {compressStatus === CompressStatus.FINISHED && (
          <div className="finished-info">
            <span>684KB</span>
            <span>-64%</span>
            <ArrowDownOutlined className="download-icon" />
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className="upload-wrapper">
      <input
        type="file"
        multiple
        accept=".jpg,.png,.jpeg"
        style={{ display: 'none' }}
        ref={inputRef as any}
        onChange={handleUpload}
      />
      {!showUploadList ? (
        <div className="upload-inner" onClick={triggerInputClick}>
          <div className="plus-box">
            <PlusOutlined className="icon" />
          </div>
          <p className="h1">图片压缩</p>
          <p className="sub-tip">（最多上传 30 个文件，单个图片最大为 25 M，支持jpg、png格式）</p>
        </div>
      ) : (
        <div className="compress-container">
          <div className="header">
            <span>压缩强度</span>
            <div className="slider-wrapper">
              <Slider marks={{ 0: '轻度', 50: '普通', 100: '强力' }} step={null} defaultValue={0} />
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
                <span>共 1 个文件，完成压缩 1 个， 1.89 MB → 684 KB，共计压缩 64%</span>
                <Button>清除队列</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadComponent
