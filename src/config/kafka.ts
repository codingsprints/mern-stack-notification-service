import { Consumer, EachMessagePayload, Kafka, KafkaConfig } from "kafkajs";
import { MessageBroker } from "../types/broker";
import { createNotificationTransport } from "../factories/notification-factory";
import { handleOrderHtml, handleOrderText } from "../handlers/orderHander";
import { configENV } from "./config";
import { NODE_ENV_VAL } from "../constant";

export class KafkaBroker implements MessageBroker {
  private consumer: Consumer;

  constructor(clientId: string, brokers: string[]) {
    let kafkaConfig: KafkaConfig = {
      clientId,
      brokers,
    };

    if (configENV.nodeEnv === NODE_ENV_VAL.PRODUCTION) {
      kafkaConfig = {
        ...kafkaConfig,
        ssl: configENV.kafkaSSL,
        connectionTimeout: 45000,
        sasl: {
          mechanism: "plain",
          username: configENV.kafkaUserName,
          password: configENV.kafkaPassword,
        },
      };
    }

    const kafka = new Kafka(kafkaConfig);

    this.consumer = kafka.consumer({ groupId: clientId });
  }

  /**
   * Connect the consumer
   */
  async connectConsumer() {
    await this.consumer.connect();
  }

  /**
   * Disconnect the consumer
   */
  async disconnectConsumer() {
    await this.consumer.disconnect();
  }

  async consumeMessage(topics: string[], fromBeginning: boolean = false) {
    await this.consumer.subscribe({ topics, fromBeginning });

    await this.consumer.run({
      eachMessage: async ({
        topic,
        partition,
        message,
      }: EachMessagePayload) => {
        // Logic to handle incoming messages.
        console.log("order messaging =======> ", {
          value: message.value.toString(),
          topic,
          partition,
        });

        if (topic === "order") {
          //todo: Decide whether to send notification or not. // according to event_type.
          const transport = createNotificationTransport("mail");

          const order = JSON.parse(message.value.toString());

          console.log("order mailer ->", order);

          await transport.send({
            to: order.data.customerId.email,
            // to: "dangaroshiyaparth@gmail.com",
            subject: "Order update.",
            text: handleOrderText(order),
            html: handleOrderHtml(order),
          });
        }
      },
    });
  }
}
