import { useEffect, useState } from 'react'
import { Button } from 'antd'
import axios from '@/utils/axios'
import './App.less'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    axios.get('https://juejin.cn/post/error')
  }, [])

  return (
    <div className="App">
      <Button type='primary'>Test</Button>
    </div>
  )
}

export default App
