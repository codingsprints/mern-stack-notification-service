import { KafkaBroker } from "../config/kafka";
import { MessageBroker } from "../types/broker";
import logger from "../config/logger";
import { NOTIFICATION_SERVICE } from "../types";
import { configENV } from "../config/config";

let broker: MessageBroker | null = null;

export const createMessageBroker = (): MessageBroker => {
  logger.info("✅ connecting to kafka broker...");
  // singleton
  if (!broker) {
    broker = new KafkaBroker(NOTIFICATION_SERVICE, configENV.broker);
  }
  return broker;
};
