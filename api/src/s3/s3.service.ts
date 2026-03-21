import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private readonly logger = new Logger(S3Service.name);

  constructor(private config: ConfigService) {
    this.s3 = new S3Client({
      region: this.config.get<string>('AWS_REGION'),
      endpoint: this.config.get<string>('AWS_ENDPOINT'),
      credentials: {
        accessKeyId: 'test',
        secretAccessKey: 'test',
      },
      forcePathStyle: true,
    });
  }

  async upload(file: Express.Multer.File) {
    try {
      const command = new PutObjectCommand({
        Bucket: 'my-bucket',
        Key: file.originalname,
        Body: file.buffer,
      });

      await this.s3.send(command);
      this.logger.log('Store file in S3 Success...');
      return {
        message: 'uploaded',
        key: file.originalname,
      };
    } catch (err) {
      this.logger.log('Error uploading file: ', err.message);
      throw new Error('Upload failed');
    }
  }
}
