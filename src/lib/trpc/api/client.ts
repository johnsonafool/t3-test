"use client";

import { httpBatchLink, loggerLink } from "@trpc/client";
import superjson from "superjson";
import {
  createHydrateClient,
  createTRPCNextBeta,
} from "src/@trpc/next-layout/client";
import { type AppRouter } from "@/lib/server/routers/_app";
import { getUrl } from "../utils";

/*
 * Create a client that can be used in the client only
 */
export const api = createTRPCNextBeta<AppRouter>({
  transformer: superjson,
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: false,
        cacheTime: Infinity,
        staleTime: Infinity,
      },
    },
  },
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === "development" ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: getUrl(),
    }),
  ],
});

/*
 * A component used to hydrate the state from server to client
 */

export const HydrateClient = createHydrateClient({
  transformer: superjson,
});
