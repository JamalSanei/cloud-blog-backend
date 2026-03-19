import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { S3Service } from "./s3/s3.service";
import { SQSService } from './sqs/sqs.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [S3Service,SQSService],
})
export class AppModule {}
