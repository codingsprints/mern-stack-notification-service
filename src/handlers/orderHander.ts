import config from "config";
import { OrderEvents, PaymentMode } from "../types";
import { configENV } from "../config/config";

export const handleOrderText = (order) => {
  console.log("order --->", order);
  // todo: put proper check logic
  if (
    order.event_type === OrderEvents.ORDER_CREATE &&
    order?.data?.newOrder?.PaymentMode === PaymentMode.CASH
  ) {
    return `Thank you for your order.\n Your order id is: ${order?.data?.newOrder?._id}`;
  }

  return "Thank you for your order.";
};

export const handleOrderHtml = (order) => {
  // todo: think about proper checks
  return `
    <h3>Thank you for your order.</h3>
    <div>Your order id is: <a href="${configENV.clientUI}/order/${order?.data?.newOrder?._id}">${order?.data?.newOrder?._id}</a></div>
`;
};
