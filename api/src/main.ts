import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');

  app.use(helmet());

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (!process.env.ALLOWED_DOMAINS?.split(',').includes(origin))
        return callback(new Error());

      return callback(null, true);
    },
  } as CorsOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
