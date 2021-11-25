import { Injectable, Scope } from '@nestjs/common';
import { LogLevel, LoggerType, LoggerService as LService } from '@paulkb/logger-test';

@Injectable({
    scope: Scope.DEFAULT, 
  })
export class LoggerService {

    private readonly _logger;

    constructor() {

        this._logger = new LService({
            serviceName: 'NestJS App',
            logLevel: LogLevel.info,
            loggingType: LoggerType.backend,
            isProd: false,
            url: 'http://localhost:5341'
        });
    }

    error(message: string, args?: any) : void {
        this._logger.error(message, args);
    }

    warn(message: string, args?: any) : void {
        this._logger.warn(message, args);
    }

    info(message: string, args?: any) : void {
        this._logger.info(message, args);
    }

    debug(message: string, args?: any) : void {
        this._logger.debug(message, args);
    }
}
