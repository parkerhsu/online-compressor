import { getConfig } from '@/utils'

const {STORE_PATH  } = getConfig()

export function getUploadStorePath(uuid: string) {
  return `${STORE_PATH}/${uuid}/file`
}

export function getCompressedStorePath(uuid: string) {
  
}