const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");

const client = new SQSClient({
    region: "us-east-1"
});

const QUEUE_URL = "https://sqs.us-east-1.amazonaws.com/345366156005/BookQueue";

async function sendBookMessage(message) {

    console.log("========== SENDING TO SQS ==========");
    console.log(message);

    const command = new SendMessageCommand({
        QueueUrl: QUEUE_URL,
        MessageBody: JSON.stringify(message)
    });

    try {

        const result = await client.send(command);

        console.log("========== SQS SUCCESS ==========");
        console.log(result);

        return result;

    } catch (err) {

        console.error("========== SQS ERROR ==========");
        console.error(err);

        throw err;
    }
}

module.exports = { sendBookMessage };