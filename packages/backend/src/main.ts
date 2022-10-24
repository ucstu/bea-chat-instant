import { Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContactController } from "./controllers/ContactController";
import { UserController } from "./controllers/UserController";
import { UserInfo } from "./entities/UserInfo";
import { JwtStrategy } from "./security/JwtStrategy";
import { ContactService } from "./services/ContactService";
import { UserService } from "./services/UserService";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserInfo]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "7d" },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
class AuthModule {}

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo])],
  providers: [ContactService],
  controllers: [ContactController],
})
class ContactModule {}

@Module({
  imports: [
    AuthModule,
    ContactModule,
    PassportModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      url: `postgres://test:test@192.168.3.2/test`,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  providers: [JwtStrategy],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
