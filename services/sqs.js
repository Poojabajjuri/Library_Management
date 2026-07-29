const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");

const client = new SQSClient({
    region: "us-east-1"
});

const QUEUE_URL = "https://sqs.us-east-1.amazonaws.com/345366156005/BookQueue";

async function sendBookMessage(message) {
    const command = new SendMessageCommand({
        QueueUrl: QUEUE_URL,
        MessageBody: JSON.stringify(message)
    });

    await client.send(command);
}

module.exports = { sendBookMessage };