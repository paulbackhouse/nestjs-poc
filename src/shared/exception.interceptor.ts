import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from './services/logger.service';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  
  constructor(private readonly logger: LoggerService) { 

  }
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
    const httpCtx = context.switchToHttp();
    const response = httpCtx.getResponse();

    try {

      return next
      .handle()
      .pipe(
        catchError(err => {
              this.logger.error(err.message, { error: err.stack, response: response });
              if (err instanceof HttpException)
                throw err; 
  
              throw new BadRequestException(err.message, err.description);
          }),
      );
  
    } 
    catch (error) 
    {
      this.logger.error('Http Interceptor failed on request', response)
    }    
  }
}