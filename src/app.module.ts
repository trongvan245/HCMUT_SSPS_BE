import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { UserController } from "./user/user.controller";
import { APP_GUARD } from "@nestjs/core";
import { JwtGuard } from "./common/guards";
import { RoleGuard } from "./common/guards/role.guard";
import { UserModule } from "./user/user.module";
import { StudentModule } from "./student/student.module";
import { PrintModule } from "./print/print.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"), // Path to the upload folder
      serveRoot: "/uploads", // URL prefix
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    UserModule,
    StudentModule,
    PrintModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: JwtGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
  ],
})
export class AppModule {}
