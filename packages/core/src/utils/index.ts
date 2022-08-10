import { parse } from 'yaml'
import * as path from 'path'
import * as fs from 'fs'

export const getEnv = () => {
  return process.env.RUNNING_ENV || 'dev'
}

export const getConfig = () => {
  const environment = getEnv()
  const yamlPath = path.join(process.cwd(), `./.config/.${environment}.yaml`)
  const yamlFile = fs.readFileSync(yamlPath, 'utf-8')
  const config = parse(yamlFile)
  return config
}

export {
  getUploadStorePath,
  getCompressedStorePath,
  getOriginFilePath,
  getCompressedFilePath,
  generateRandomZipPath
} from './file'
