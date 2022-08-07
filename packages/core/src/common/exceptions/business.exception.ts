import { HttpException, HttpStatus } from '@nestjs/common'
import { BUSINESS_ERROR_CODE } from './business.errorCodes'

type BusinessError = {
  code: number
  message: string
}

export class BusinessException extends HttpException {
  constructor(err: BusinessError | string) {
    if (typeof err === 'string') {
      err = {
        code: BUSINESS_ERROR_CODE.COMMON,
        message: err
      }
    }
    super(err, HttpStatus.OK)
  }

  static throwForbidden() {}
}
