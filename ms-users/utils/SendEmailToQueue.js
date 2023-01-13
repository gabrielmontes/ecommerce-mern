import dotenv from 'dotenv';
import amqp from "amqplib/callback_api.js";

dotenv.config();

const SendEmailToQueue = async(message) => {  
  try {
    amqp.connect("amqp://" + process.env.RABBITMQ_URL, (error, connection) => {
      if (error) {
        throw error;
      }

      connection.createChannel((connErr, channel) => {
        if (connErr) {
          throw connErr;
        }

        channel.assertQueue('email', {
          durable: true
        });

        channel.sendToQueue('email',  
          Buffer.from(JSON.stringify(message)), {
            persistent: true
          });
      });

      setTimeout(function () {
        connection.close();
      }, 500);
      
      console.log(`Email has been sent to queue: ${JSON.stringify(message)}`);
    });
  } catch (error) {
    return error;
  }
};


export default SendEmailToQueue;