import { getConfig } from '@/utils'
import * as fs from 'fs'

const { STORE_PATH } = getConfig()

export function getUploadStorePath(uuid: string) {
  if (!fs.existsSync(STORE_PATH)) {
    fs.mkdirSync(STORE_PATH)
  }

  const topDir = `${STORE_PATH}/${uuid}`

  if (!fs.existsSync(topDir)) {
    fs.mkdirSync(topDir)
    fs.mkdirSync(`${topDir}/origin`)
  }
  return `${topDir}/origin`
}

export function getOriginFilePath(uuid: string) {
  const dir = `${STORE_PATH}/${uuid}/origin`
  const filename = fs.readdirSync(dir)[0]
  return `${dir}/${filename}`
}

export function getCompressedFilePath(uuid: string) {
  const dir = `${STORE_PATH}/${uuid}/compress`
  const filename = fs.readdirSync(dir)[0]
  return `${dir}/${filename}`
}

export function getCompressedStorePath(uuid: string) {}

export function generateRandomZipPath() {
  const topDir = `${STORE_PATH}/zip`
  if (!fs.existsSync(topDir)) {
    fs.mkdirSync(topDir)
  }
  const randomKey = Math.floor(Math.random() * 1e12)
  return `${topDir}/${randomKey}.zip`
}
