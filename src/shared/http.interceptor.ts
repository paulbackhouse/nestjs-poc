import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from './services/logger.service';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  
  constructor(private readonly logger: LoggerService) { 

  }
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
    const httpCtx = context.switchToHttp();
    const request = httpCtx.getRequest();

    try {

      this.logger.info(`[IN] --> Http Request: ${request.method} ${request.url}`, request);
      const now = Date.now();
      
      return next
        .handle()
        .pipe(
          tap(() => 
            this.logger.info(`[OUT] <-- Http Response: ${request.method} ${request.url} in ${Date.now() - now}ms`)
          ),
        );
  
    } 
    catch (error) 
    {
      this.logger.error('Http Interceptor failed on request', request)
    }    
  }
}