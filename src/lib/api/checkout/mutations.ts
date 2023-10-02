import Stripe from "stripe";
import { env } from "@/lib/env.mjs";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

export const createCheckout = async (userId: string) => {
  return stripe.checkout.sessions.create({
    payment_method_types: ["card", "us_bank_account"],
    metadata: {
      userId,
    },
    line_items: [{ price: env.PRICE_ID, quantity: 1 }],
    mode: "payment",
    success_url: `${env.HOST_NAME}`,
    cancel_url: `${env.HOST_NAME}`,
  });
};
