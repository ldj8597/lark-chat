import { z } from "zod";
import { createRouter } from "../context";
import superjson from "superjson";

export const appRouter = createRouter()
  .transformer(superjson)
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
