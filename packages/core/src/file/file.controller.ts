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
import { join } from 'path'
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
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() body
  ) {
    const uuid = body.uuid
    const fileType = file.mimetype.split('/')[1]
    const filename = body.filename || `file-${Math.floor(Math.random() * 1e8)}.${fileType}`
    const filePath = getUploadStorePath(uuid)
    const writeStream = fs.createWriteStream(`${filePath}/${filename}`)
    writeStream.write(file.buffer)
  }

  @Post('compress')
  compress(@Body() body, @Res() res) {
    const key = body.key
    let filePath = getOriginFilePath(key)
    const filename = filePath.split('/').pop()
    filePath = join(process.cwd(), filePath)
    const originFileStats = fs.statSync(filePath)
    let targetFilePath = getCompressedStorePath(key)
    targetFilePath = join(process.cwd(), `${targetFilePath}/${filename}`)
    console.log(filePath, targetFilePath)
    sharp(filePath)
      .png({ quality: 20 })
      .toFile(targetFilePath, (err) => {
        const compressedFileStats = fs.statSync(targetFilePath)
        res.send({ origin_size: originFileStats.size, compress_size: compressedFileStats.size })
      })
  }

  @Get('download')
  downloadFile(@Res() res: Response, @Query() query) {
    const key = query.key
    const filePath = getOriginFilePath(key)
    // Why return 503 when set this filename to Content-Disposition?
    const filename = filePath.split('/').pop()
    const buffer = fs.readFileSync(join(process.cwd(), filePath))
    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': `attachment; filename=compressed.png`
    })
    res.send(buffer)
  }

  @Post('download-zip')
  batchDownloadFile(@Res({ passthrough: true }) res: Response, @Body() body) {
    const keys = body.keys
    const zip = this.fileService.generateZipFile(keys)
    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="compressed.zip"`
    })
    res.send(zip.toBuffer())
  }
}
