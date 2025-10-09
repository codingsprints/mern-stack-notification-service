import * as dotenv from "dotenv";
import path from "path";
import config from "config";
import { NODE_ENV_VAL } from "../constant";

const nodeENV: string = NODE_ENV_VAL.DEVELOPMENT;
// const nodeENV: string = NODE_ENV_VAL.TEST;
// const nodeENV: string = NODE_ENV_VAL.PRODUCTION;

dotenv.config({
  path: path.resolve(
    __dirname,
    `../../.env.${process.env.NODE_ENV ?? nodeENV}`,
  ),
});

interface Config {
  port: number;
  nodeEnv: string;
  baseUrl: string;
  hostname: string;
  jwksUri: string;
  broker: string[];
  mailhost: string;
  mailport: number;
  mailuser: string;
  mailpass: string;
  mailfrom: string;
  clientUI: string;
  kafkaSSL: boolean;
  kafkaUserName: string;
  kafkaPassword: string;
}

export const configENV: Config = {
  port: config.get("server.port") || 5005,
  nodeEnv: process.env.NODE_ENV || NODE_ENV_VAL.PRODUCTION,
  baseUrl:
    config.get("server.baseUrl") ?? "/pizza-app/notification-service/api/v1",
  hostname: config.get("server.hostname") ?? "localhost",
  jwksUri: config.get("auth.jwksUri") || "",
  broker: config.get("kafka.broker") || [],
  mailhost: config.get("mail.host") || "",
  mailport: config.get("mail.port") || 0,
  mailuser: config.get("mail.auth.user") || "",
  mailpass: config.get("mail.auth.pass") || "",
  mailfrom: config.get("mail.from") || "",
  clientUI: config.get("frontend.clientUI") || "",
  kafkaSSL: config.get("kafka.ssl") || false,
  kafkaUserName: config.get("kafka.sasl.username") || "",
  kafkaPassword: config.get("kafka.sasl.password") || "",
};
