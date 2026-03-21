import { SQS, SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SQSService {
  private queueUrl: string;
  private endPoint: string;
  private sqs: SQSClient;
  private readonly logger = new Logger(SQSService.name);

  constructor(private readonly configService: ConfigService) {
    this.queueUrl = this.configService.get<string>('SQS_QUEUE_URL') || '';
    this.endPoint = this.configService.get<string>('AWS_ENDPOINT') || '';
    this.sqs = new SQSClient({
      region: 'us-east-1',
      endpoint: this.endPoint,
      credentials: {
        accessKeyId: 'test',
        secretAccessKey: 'test',
      },
    });
  }

  async sendMessage(data: any) {
    try {
      const command = new SendMessageCommand({
        QueueUrl: this.queueUrl,
        MessageBody: JSON.stringify(data),
      });
      this.logger.log('Send message to worker...');
      await this.sqs.send(command);

      return { message: 'sent to queue' };
    } catch (err) {
      this.logger.log('Error sending message: ', err.message);
      throw new Error('Send message  failed');
    }
  }
}
