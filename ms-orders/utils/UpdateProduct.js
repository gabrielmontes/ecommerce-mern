import dotenv from 'dotenv';
import amqp from "amqplib/callback_api.js";

dotenv.config();

const UpdateProduct = async(message) => {  
  try {
    amqp.connect("amqp://" + process.env.RABBITMQ_URL, (error, connection) => {
      if (error) {
        throw error;
      }

      connection.createChannel((connErr, channel) => {
        if (connErr) {
          throw connErr;
        }

        channel.assertQueue('product', {
          durable: true
        });

        channel.sendToQueue('product',  
          Buffer.from(JSON.stringify(message)), {
            persistent: true
          });
      });

      setTimeout(function () {
        connection.close();
      }, 500);
      
      console.log(`Message has been sent to queue: ${JSON.stringify(message)}`);
    });
  } catch (error) {
    return error;
  }
};


export default UpdateProduct;