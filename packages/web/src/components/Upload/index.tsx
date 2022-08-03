import * as React from 'react'
import { Button, Upload, message } from 'antd'
import type { UploadProps } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

interface Props {}

const { Dragger } = Upload

const UploadComponent: React.FC<Props> = (props) => {
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'http://localhost:3001/file/upload',
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

  return (
    <div className="upload-container">
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
        </p>
      </Dragger>
    </div>
  )
}

export default UploadComponent
