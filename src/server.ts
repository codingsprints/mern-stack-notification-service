import logger from "./config/logger";
import { createMessageBroker } from "./factories/broker-factory";
import { TOPIC_NAME } from "./types";
import { MessageBroker } from "./types/broker";

const startServer = async () => {
  let broker: MessageBroker | null = null;
  try {
    broker = createMessageBroker();
    await broker.connectConsumer();
    await broker.consumeMessage([TOPIC_NAME.order], false);
  } catch (err) {
    logger.error("Error happened: ", err.message);
    if (broker) {
      await broker.disconnectConsumer();
    }
    process.exit(1);
  }
};

void startServer();
