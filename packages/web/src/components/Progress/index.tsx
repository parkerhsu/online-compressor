import React, { useEffect, useState } from 'react'
import { Progress as AntProgress } from 'antd'
import './index.less'

interface Props {
  type: 'line' | 'infinite'
  style?: React.CSSProperties
}

const Progress: React.FC<Props> = (props) => {
  const { type, style } = props
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [])

  return type === 'line' ? (
    <div style={{ width: '130px' }}>
      <AntProgress percent={progress} status="active" showInfo={false} />
    </div>
  ) : (
    <div className="progress-bar" style={style}>
      <div className="progress-striped"></div>
    </div>
  )
}

export default Progress
