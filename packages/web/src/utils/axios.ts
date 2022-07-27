import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  baseURL: '',
  timeout: 5000
})

instance.interceptors.response.use(
  (config) => {},
  (error) => {
    message.error(`${error.message || '接口请求错误'}`)
    return Promise.reject(error)
  }
)

export default instance
