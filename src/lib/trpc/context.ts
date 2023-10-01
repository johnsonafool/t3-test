import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getUserAuth } from "../auth/utils";
import { db } from "../db";

export async function createContext(opts?: FetchCreateContextFnOptions) {
  const { session } = await getUserAuth();

  return {
    session,
    headers: opts && Object.fromEntries(opts.req.headers),
    db,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
