import amqp from "amqplib/callback_api.js";
import dotenv from "dotenv";
import UpdateProductQuantity from './UpdateProductQuantity.js';

dotenv.config();

const ListenToQueue = () => {
  try {
    amqp.connect("amqp://" + process.env.RABBITMQ_URL, (error, connection) => {
      if (error) {
        throw error;
      }

      connection.createChannel((connErr, channel) => {
        if (connErr) {
          throw connErr;
        }

        channel.assertQueue('product', { durable: true });

        channel.prefetch(1);

        channel.consume('product', (msg) => {
          const res = JSON.parse(msg.content.toString());

          res.map((product) => {
            UpdateProductQuantity(product);
          })

          setTimeout(() => {
            channel.ack(msg);
          }, 500);
        });
      });

    });

  } catch (error) {
    throw new Error(error);
  }

}

export default ListenToQueue;