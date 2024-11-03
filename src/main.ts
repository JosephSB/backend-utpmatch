import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ApiModule } from '@api/api.module';
import config from '@config/index';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule, { cors: true });

  const swagger_config = new DocumentBuilder()
    .setTitle('UTPMATCH API')
    .setDescription('UTPMATCH IS AN APP FOR SEARCH LOVE IN STUDENTS OF UTP')
    .setVersion('1.0')
    .addTag('UTPMATCH API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swagger_config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(config.PORT);
}
bootstrap();
