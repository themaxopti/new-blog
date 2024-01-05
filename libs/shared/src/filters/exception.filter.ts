import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<any>();
    const status = exception.getStatus() || 400;

    response.status(status).json({
      statusCode: status,
      error: exception['response']['message'] || exception.message,
      message: exception.message,
    });
  }
}
