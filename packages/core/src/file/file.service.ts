import { Injectable } from '@nestjs/common'
import * as AdmZip from 'adm-zip'
import { getOriginFilePath, generateRandomZipPath } from '@/utils'

@Injectable()
export class FileService {
  constructor() {}

  generateZipFile(keys: string) {
    const admZip = new AdmZip()
    const keyArr = keys.split(',')
    keyArr.forEach(key => {
      const filePath = getOriginFilePath(key)
      admZip.addLocalFile(filePath)
    })
    const zipPath = generateRandomZipPath()
    admZip.writeZip(zipPath)
    return admZip
  }
}