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
import { Express, Response } from 'express'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { createReadStream } from 'fs'
import { join } from 'path'
import { diskStorage } from 'multer'

@Controller('file')
export class FileController {
  constructor() {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploadFiles'
    })
  }))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), /* new FileTypeValidator({ fileType: 'jpg' }) */]
      })
    )
    file: Express.Multer.File
  ) {
    return `${typeof file}`
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
