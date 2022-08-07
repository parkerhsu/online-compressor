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
  StreamableFile
} from '@nestjs/common'
import { Express, response, Response } from 'express'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { createReadStream } from 'fs'
import { join } from 'path'
import { diskStorage } from 'multer'
import { getUploadStorePath, getCompressedStorePath } from '@/utils'
import { BusinessException } from '@/common/exceptions/business.exception'
// import * as nuid from 'nuid'

@Controller('file')
export class FileController {
  constructor() {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const uuid = req.body.uuid
        if (!uuid) throw new BusinessException("can't get uuid")
        cb(null, getUploadStorePath(uuid))
      },
      filename: (req, file, cb) => {
        const fileName = `${file.filename}.${file.mimetype.split('/')[1]}`
        return cb(null, fileName)
      }
    })
  }))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), /* new FileTypeValidator({ fileType: 'jpg' }) */]
      })
    )
    file: Express.Multer.File,
    @Res() res: Response
  ) {
    return ''
  }

  @Post('upload-multi')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return 'files'
  }

  @Get('download')
  downloadFile(@Res({ passthrough: true }) res: Response): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'))
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="package.json"'
    })
    return new StreamableFile(file)
  }
}