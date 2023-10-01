import { loadStripe } from "@stripe/stripe-js";
import { env } from "@/lib/env.mjs";
import { api } from "@/lib/trpc/api/server";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_KEY);

export function useBuyCredits() {
  const checkout = api.checkout.createCheckout.mutate();

  return {
    buyCredits: async () => {
      const response = await checkout;
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({
        sessionId: response.id,
      });
    },
  };
}
