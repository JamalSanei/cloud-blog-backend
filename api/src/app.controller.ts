import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3/s3.service';
import { SQSService } from './sqs/sqs.service';
import { BlogService } from './blog/blog.service';

@Controller()
export class AppController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly sqsService: SQSService,
    private readonly blogService: BlogService,
  ) {}

  @Get('health')
  healthCheck() {
    return { status: 'ok' };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const result = await this.s3Service.upload(file);

    const blog = await this.blogService.create({
      title: 'test',
      imageKey: result.key,
    });

    await this.sqsService.sendMessage({
      key: result.key,
      action: 'PROCESS_IMAGE',
    });

    return blog;
  }
}
