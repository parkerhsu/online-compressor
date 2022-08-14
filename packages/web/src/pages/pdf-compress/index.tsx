import DisabledContext from 'antd/lib/config-provider/DisabledContext'
import React from 'react'
import Upload from '@/components/Upload'
import './index.css'

function PdfCompress() {
  return (
    <div>
      <div className="bg"></div>
      <Upload type='pdf' />
    </div>
  )
}

export default PdfCompress
