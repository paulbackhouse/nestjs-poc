import { Controller, Get, Post, Put, Patch, Req, Body, HttpException, HttpStatus, Param, Version } from '@nestjs/common';
import { Request } from 'express';
import { LoggerService } from 'src/shared/services/logger.service';
import { LoggerOtherService } from 'src/shared/services/logger.other.service';
import { UserService } from './services/user.service';
import { UserDto } from './types/user.dto';


@Controller('users')
export class UserController {
  constructor(
    private readonly logger: LoggerService,
    private readonly loggerOther: LoggerOtherService,
    private readonly userService: UserService) 
  {}

  @Version('1')
  @Get()
  async getAllAsync(@Req() request: Request): Promise<UserDto[]> {
    return await this.userService.getAllAsync();
  }

  @Version('1')
  @Get(':id')
  async getByIdAsync(@Param() params) : Promise<UserDto> {
    return await this.userService.getByIdAsync(params.id);
  }

  @Version('1')
  @Post()
  async createAsync(@Body() user: UserDto) : Promise<UserDto> {
      return await this.userService.createAsync(user);
  }


  // endpoint below for demo purposes

  @Version('1')
  @Patch('/error')
  errorV1() : void {
    // ref: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418
    throw new HttpException('Invalid request, I\'m a teapot - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418', HttpStatus.I_AM_A_TEAPOT);
  }

  @Version('2')
  @Patch('/error')
  errorV2() : void {
    // ref: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418
    throw new HttpException('Invalid request, I told you before, I am a teapot!', HttpStatus.I_AM_A_TEAPOT);
  }  

  @Version('1')
  @Post('/other-service')
  otherService() : void {
    this.loggerOther.info('Long Process Other Service: Started');
    this.loggerOther.info('Long Process: Retrievd 200 records to process');

    this.loggerOther.warn('Long Process Other Service: Unable to retrieve data for record 56');
    this.loggerOther.info('Long Process Other Service: Retrying record 56...');

    this.loggerOther.warn('Long Process Other Service: Unable to retrieve data for record 124');
    this.loggerOther.info('Long Process Other Service: Retrying record 124...');
    this.loggerOther.warn('Long Process Other Service: Unable to retrieve data for record 124');
    this.loggerOther.info('Long Process Other Service: Retrying record 124...');
    this.loggerOther.warn('Long Process Other Service: Unable to retrieve data for record 124');
    this.loggerOther.error('Long Process Other Service: Failed to process record 124');

    this.loggerOther.warn('Long Process Other Service: Unable to retrieve data for record 153');
    this.loggerOther.info('Long Process Other Service: Retrying record 153...');

    this.loggerOther.warn('Long Process Other Service: Unable to retrieve data for record 199');
    this.loggerOther.info('Long Process Other Service: Retrying record 199...');
    this.loggerOther.warn('Long Process Other Service: Unable to retrieve data for record 199');
    this.loggerOther.info('Long Process Other Service: Retrying record 199...');
    this.loggerOther.warn('Long Process Other Service: Unable to retrieve data for record 199');
    this.loggerOther.error('Long Process Other Service: Failed to process record 199');

    this.loggerOther.error('Long Process Other Service: Finished with failures... processed 198 of 200 records', {
      unprocessedIds: "124, 199"
    });
  }

  @Version('1')
  @Put('/long-process')
  longProcess() : void {
    this.logger.info('Long Process: Started');
    this.logger.info('Long Process: Retrievd 200 records to process');

    this.logger.warn('Long Process: Unable to retrieve data for record 56');
    this.logger.info('Long Process: Retrying record 56...');

    this.logger.warn('Long Process: Unable to retrieve data for record 124');
    this.logger.info('Long Process: Retrying record 124...');
    this.logger.warn('Long Process: Unable to retrieve data for record 124');
    this.logger.info('Long Process: Retrying record 124...');
    this.logger.warn('Long Process: Unable to retrieve data for record 124');
    this.logger.error('Long Process: Failed to process record 124');

    this.logger.warn('Long Process: Unable to retrieve data for record 153');
    this.logger.info('Long Process: Retrying record 153...');

    this.logger.warn('Long Process: Unable to retrieve data for record 199');
    this.logger.info('Long Process: Retrying record 199...');
    this.logger.warn('Long Process: Unable to retrieve data for record 199');
    this.logger.info('Long Process: Retrying record 199...');
    this.logger.warn('Long Process: Unable to retrieve data for record 199');
    this.logger.error('Long Process: Failed to process record 199');

    this.logger.error('Long Process: Finished with failures... processed 198 of 200 records', {
      unprocessedIds: "124, 199"
    });

  }

}
