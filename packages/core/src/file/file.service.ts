import { Injectable } from '@nestjs/common'
import * as AdmZip from 'adm-zip'
import { getOriginFilePath, generateRandomZipPath, getCompressedStorePath, getCompressedFilePath } from '@/utils'
import * as sharp from 'sharp'
import * as fs from 'fs'
import { join, extname } from 'path'

@Injectable()
export class FileService {
  generateZipFile(keys: string) {
    const admZip = new AdmZip()
    const keyArr = keys.split(',')
    keyArr.forEach((key) => {
      const filePath = getCompressedFilePath(key)
      admZip.addLocalFile(filePath)
    })
    const zipPath = generateRandomZipPath()
    admZip.writeZip(zipPath)
    return admZip
  }

  compressImage(key: string, quality: number) {
    return new Promise((resolve, reject) => {
      let filePath = getOriginFilePath(key)
      const filename = filePath.split('/').pop()
      const fileType = extname(filename).slice(1)
      if (!['png', 'jpg', 'gif'].includes(fileType)) {
        reject('Error: file type must be png or jpg')
      }

      const originFileStats = fs.statSync(filePath)
      filePath = join(process.cwd(), filePath)
      let targetFilePath = getCompressedStorePath(key)
      targetFilePath = join(process.cwd(), `${targetFilePath}/${filename}`)

      let sharpPromise = sharp(filePath)
      console.log(`get quality: ${quality}`)
      const config = { quality: quality || 80 }

      switch (fileType) {
        case 'png':
          sharpPromise = sharpPromise.png(config)
          break
        case 'jpg':
          sharpPromise = sharpPromise.jpeg(config)
          break
        case 'gif':
          sharpPromise = sharpPromise.gif(config)
          break
      }

      sharpPromise.toFile(targetFilePath, (err) => {
        if (err) reject(err)
        const compressedFileStats = fs.statSync(targetFilePath)
        resolve({ origin_size: originFileStats.size, compress_size: compressedFileStats.size })
      })
    })
  }

  compressPdf(key: string, quality: number) {
    // todo:
    
  }
}
