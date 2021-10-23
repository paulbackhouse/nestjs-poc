import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setViewEngine('hbs');
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.MEDIA_TYPE,
    key: 'v=',
  });
  app.useGlobalPipes(new ValidationPipe({
    // Make sure that there's no unexpected data
    whitelist: true,
    forbidNonWhitelisted: false,
    forbidUnknownValues: true,

    /**
     * Detailed error messages since this is 4xx
     */
    disableErrorMessages: false,
    
    validationError: {
      /**
       * WARNING: Avoid exposing the values in the error output (could leak sensitive information)
       */
      value: false,
    },

    /**
     * Transform the JSON into a class instance when possible.
     * Depends on the type of the data on the controllers
     */
    transform: true,
  }));  

  await app.listen(3000);
}
bootstrap();
