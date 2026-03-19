 

import { SQS, SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export class SQSService {

  private queueUrl: string 
  private endPoint:  string 
  private sqs: SQSClient
  private readonly logger = new Logger(SQSService.name)


  constructor(private readonly configService: ConfigService){
    this.queueUrl = this.configService.get("SQS_QUEUE_URL") || ""
    this.endPoint = this.configService.get('AWS_ENDPOINT') || ""
    this.sqs =   new SQSClient({
    region: "us-east-1",
    endpoint: this.endPoint,
    credentials: {
      accessKeyId: "test",
      secretAccessKey: "test",
    },
  });
  }


  async sendMessage(data: any) {
    try {
      const command = new SendMessageCommand({
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(data),
    });

    await this.sqs.send(command);

    return { message: "sent to queue" };  
    } catch (err) {
      this.logger.log('Error sending message: ', err.message)
      throw new Error("Send message  failed")
    }
    
  }
}