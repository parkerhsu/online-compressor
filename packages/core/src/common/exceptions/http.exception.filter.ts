import { Request, Response } from 'express'
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { BusinessException } from './business.exception'

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()

    if (exception instanceof BusinessException) {
      const error = exception.getResponse()
      response.status(HttpStatus.OK).json({
        data: null,
        status: error['code'],
        extra: {},
        message: error['message'],
        success: false
      })
      return
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.getResponse()
    })
  }
}
