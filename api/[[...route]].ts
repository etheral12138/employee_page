import { Hono } from "hono";
import { logger } from "hono/logger";
import { handle } from "hono/vercel";
import { appRouter } from "./routes/_app";
import { trpcServer } from "@hono/trpc-server";

export const config = {
  runtime: "edge",
};

// 使用普通的 Hono 实例
const app = new Hono();

app.use("*", logger());

app.use("/trpc/*", trpcServer({
    router: appRouter,
})
)

app.all("*", (c) => c.text("404: Not Found"));

export const GET = handle(app);
export const PUT = handle(app);
export default app;
