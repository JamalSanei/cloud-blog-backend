// worker/index.js

const {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} = require("@aws-sdk/client-sqs");



const queueUrl =
  "http://localstack:4566/000000000000/my-queue";

async function pollMessages() {

  try {
    await new Promise(r => setTimeout(r, 5000));

    const sqs = new SQSClient({
      region: "us-east-1",
      endpoint: "http://localstack:4566",
      credentials: {
        accessKeyId: "test",
        secretAccessKey: "test",
      },
    });

    while (true) {
      const res = await sqs.send(
        new ReceiveMessageCommand({
          QueueUrl: queueUrl,
          MaxNumberOfMessages: 1,
          WaitTimeSeconds: 10,
        })
      );

      if (res.Messages) {
        for (const msg of res.Messages) {
          console.log("Received:", msg.Body);

          const data = JSON.parse(msg.Body);

          // simulate processing
          console.log("Processing:", data.key);


          await sqs.send(
            new DeleteMessageCommand({
              QueueUrl: queueUrl,
              ReceiptHandle: msg.ReceiptHandle,
            })
          );

          console.log("Deleted message");
        }
      }
    }

  } catch (err) {
    console.log('error in poll message: ', err)
  }

}

pollMessages();