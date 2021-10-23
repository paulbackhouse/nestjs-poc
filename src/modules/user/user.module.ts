import { Module } from '@nestjs/common';
import  { UserController } from './user.controller'
import {LoggerService } from '../../shared/services/logger.service'
import {LoggerOtherService } from '../../shared/services/logger.other.service'
import { UserService } from './services/user.service';
import { UserRepositoryService } from './services/user.repository.service';
import { UserProfile } from './user.profile.map';

@Module({
  controllers: [UserController],
  providers: [LoggerService, LoggerOtherService, UserService, UserRepositoryService, UserProfile]
})
export class UserModule {}
