import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { EventsModule } from './modules/events/events.module';
import { HttpInterceptor } from './shared/http.interceptor';
import { ExceptionInterceptor } from './shared/exception.interceptor';
import { LoggerService } from './shared/services/logger.service';

@Module({
  imports: [
    AutomapperModule.forRoot({
      options: [{ name: 'defaultMapper', pluginInitializer: classes }],
      singular: true,
    }), 
    UserModule,
    EventsModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    },  
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionInterceptor,
    },      
    LoggerService,
    AppService]
})
export class AppModule implements OnApplicationBootstrap, OnApplicationShutdown {

  constructor(private readonly logger: LoggerService) {}

  onApplicationShutdown(signal?: string) {
    this.logger.info('Application is shutting down');
  }
  
  onApplicationBootstrap() {
    this.logger.info('Application is starting up');
  }

}
