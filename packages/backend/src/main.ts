import { Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContactController } from "./controllers/ContactController";
import { UserController } from "./controllers/UserController";
import { User } from "./entitys/User";
import { ContactService } from "./services/ContactService";
import { UserService } from "./services/UserService";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
class UserModule {}

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ContactService],
  controllers: [ContactController],
})
class ContactModule {}

@Module({
  imports: [
    UserModule,
    ContactModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      url: `postgres://test:test@192.168.3.2/test`,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
