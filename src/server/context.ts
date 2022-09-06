import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { prisma } from "./db/client";

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  return {
    req,
    res,
    prisma,
  };
}
type Context = trpc.inferAsyncReturnType<typeof createContext>;

// Helper function to create a router with your app's context
export function createRouter() {
  return trpc.router<Context>();
}
