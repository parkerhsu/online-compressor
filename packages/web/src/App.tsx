import { useEffect, useState } from 'react'
import { Button, Upload, message } from 'antd'
import type { UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons'
import axios from '@/utils/axios'
import './App.less'

const { Dragger } = Upload

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    
  }, [])

  const props: UploadProps = {
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
    <div className="App">
      <Dragger {...props}>
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

export default App
