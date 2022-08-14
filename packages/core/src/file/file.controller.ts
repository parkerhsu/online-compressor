import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UploadedFiles,
  Get,
  Res,
  StreamableFile,
  Body,
  Req,
  Query
} from '@nestjs/common'
import { Express, response, Response } from 'express'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { createReadStream } from 'fs'
import { join, extname } from 'path'
import { diskStorage } from 'multer'
import { getUploadStorePath, getCompressedStorePath, getCompressedFilePath, getOriginFilePath } from '@/utils'
import { BusinessException } from '@/common/exceptions/business.exception'
import { ConfigService } from '@nestjs/config'
import * as fs from 'fs'
import * as stream from 'stream'
import * as sharp from 'sharp'
import { FileService } from './file.service'

@Controller('file')
export class FileController {
  private STORE_PATH
  constructor(private configService: ConfigService, private readonly fileService: FileService) {
    this.STORE_PATH = this.configService.get('STORE_PATH')
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    const uuid = body.uuid
    const fileType = file.mimetype.split('/')[1]
    const filename = body.filename || `file-${Math.floor(Math.random() * 1e8)}.${fileType}`
    const filePath = getUploadStorePath(uuid)
    const writeStream = fs.createWriteStream(`${filePath}/${filename}`)
    writeStream.write(file.buffer)
  }

  @Post('compress')
  async compress(@Body() body, @Res() res) {
    let result
    try {
      const key = body.key
      const quality = body.quality
      const type = body.type
      if (type === 'pdf') {
        result = await this.fileService.compressPdf(key, quality)
      } else {
        result = await this.fileService.compressImage(key, quality)
      }
    } catch (e) {
      console.error(e)
      throw new BusinessException('compress error')
    }

    res.send(result).end()
  }

  @Get('download')
  downloadFile(@Res() res: Response, @Query() query) {
    const key = query.key
    const filePath = getOriginFilePath(key)
    // Why return 503 when set this filename to Content-Disposition?
    const filename = filePath.split('/').pop()
    const fileType = extname(filename).slice(1)
    if (!['png', 'jpg'].includes(fileType)) {
      throw new Error('Error: file type must be png or jpg')
    }

    const buffer = fs.readFileSync(join(process.cwd(), filePath))
    res.set({
      'Content-Type': `image/${fileType}`,
      'Content-Disposition': `attachment; filename=compressed.${fileType}`
    })
    res.send(buffer).end()
  }

  @Post('download-zip')
  batchDownloadFile(@Res({ passthrough: true }) res: Response, @Body() body) {
    const keys = body.keys
    let zip
    try {
      zip = this.fileService.generateZipFile(keys)
    } catch (e) {
      throw new Error('Error: generate zip error')
    }

    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="compressed.zip"`
    })
    res.send(zip.toBuffer()).end()
  }
}
