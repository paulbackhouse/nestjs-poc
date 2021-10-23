import { Injectable, Scope } from '@nestjs/common';

@Injectable({
    scope: Scope.DEFAULT, 
  })
export class LoggerService {

    private readonly _logger;

    constructor() {
        const pino = require('pino');
        const seq = require('pino-seq');
        const stream = seq.createStream({ serverUrl: 'http://localhost:5341' });
        this._logger = pino({ name: 'NestJS App' }, stream);
    }


    log(message: string, args?: any) : void {
        if (args)
            this._logger.log(this.parseArgs(args), message);
        else
            this._logger.log(message);
    }

    error(message: string, args?: any) : void {
        if (args)
            this._logger.error(this.parseArgs(args), message);
        else
            this._logger.error(message);
    }

    warn(message: string, args?: any) : void {
        if (args)
            this._logger.warn(this.parseArgs(args), message);
        else
            this._logger.warn(message);
    }

    info(message: string, args?: any) : void {
        if (args)
            this._logger.info(this.parseArgs(args), message);
        else
            this._logger.info(message);
    }

    debug(message: string, args?: any) : void {
        if (args)
            this._logger.debug(this.parseArgs(args), message);
        else
            this._logger.debug(message);
    }

    private parseArgs(args: any) : any {
        return { 
            data: args
        }
    }
}
