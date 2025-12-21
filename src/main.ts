import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';
import cookieParser from 'cookie-parser';

require ('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  app.useGlobalPipes(new ValidationPipe());

  // config versioning
  app.setGlobalPrefix('api');
  app.enableVersioning({
  type: VersioningType.URI,
  // http://localhost:3000/api/v2/companies?page=1&limit=10&name=/eric/i
  // instead of .../v2/... -> them 'api'
  // prefix: 'api/v',
  defaultVersion: ['1', '2'] // v1, v2
  });

  //config cookies
  app.use(cookieParser());

  //config cors
  app.enableCors(
    {
      "origin": true,
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      credentials: true
    }
  )

  await app.listen(3000);
}
bootstrap();
