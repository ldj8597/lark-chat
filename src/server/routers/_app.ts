import { z } from "zod";
import { createRouter } from "../context";
import superjson from "superjson";
import { roomRouter } from "./room";

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
  })
  .merge("room.", roomRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
