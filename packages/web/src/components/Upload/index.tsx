import * as React from 'react'
import { Button, Upload, message } from 'antd'
import type { UploadProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './index.less'

interface Props {}

const { Dragger } = Upload

const UploadComponent: React.FC<Props> = (props) => {
  const inputRef = React.useRef<HTMLInputElement>()

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    action: '/api/file/upload',
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    }
  }

  function triggerInputClick() {
    inputRef.current?.click()
  }

  function handleUpload(e: any) {
    const files = e.target.files
    console.log(files)
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
      <div className="upload-inner" onClick={triggerInputClick}>
        <div className="plus-box">
          <PlusOutlined className="icon" />
        </div>
        <p className="h1">图片压缩</p>
        <p className="sub-tip">（最多上传 30 个文件，单个图片最大为 25 M，支持jpg、png格式）</p>
      </div>

      
    </div>
  )
}

export default UploadComponent
