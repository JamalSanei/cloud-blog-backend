import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { S3Service } from './s3/s3.service';
import { SQSService } from './sqs/sqs.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'user',
      password: 'pass',
      database: 'blog',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BlogModule,
  ],
  controllers: [AppController],
  providers: [S3Service, SQSService],
})
export class AppModule {}
