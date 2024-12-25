import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: false }));

  const config = new DocumentBuilder()
    .setTitle("SSPS")
    .setDescription("SSPS API description")
    .setVersion("2.0")
    .addBearerAuth()
    .addTag("authenticate")
    .addTag("Users")
    .addTag("print")
    .addTag("admin")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Optional: Keeps the token after refreshing the page
    },
  }); //https://github.com/nestjs/swagger/issues/92 add trailing slash to the end of the url

  const allowedOrigins = [
    "http://localhost:5173", // Frontend service 1 (development)
    "http://localhost:3000", // Frontend service 2 (development)
    "http://localhost:4000", // Frontend service 3 (development)
  ];

  app.enableCors({ origin: allowedOrigins, methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", credentials: true });

  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT") || 4000;
  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
