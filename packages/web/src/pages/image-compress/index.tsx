import React from 'react'
import Upload from '@/components/Upload'
import './index.css'

function ImageCompress() {
  return (
    <div>
      <div className="bg"></div>
      <Upload type="png" />
    </div>
  )
}

export default ImageCompress
