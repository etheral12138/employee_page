import { Hono } from "hono";
import { logger } from "hono/logger";
import { handle } from "hono/vercel";
import { createEmployeeAdapter, createTRPCAdapter } from "./routes/trpcAdapter";

export const config = {
  runtime: "edge",
};

// 使用普通的 Hono 实例
const app = new Hono();

app.use("*", logger());

// 创建tRPC路由
const trpcApp = createTRPCAdapter();
// 创建兼容原有API路径的适配器
const employeeApp = createEmployeeAdapter();

const apiRoutes = app.basePath("/api")
  .route("/employee", employeeApp)
  .route("/trpc", trpcApp);

app.all("*", (c) => c.text("404: Not Found"));

export const GET = handle(app);
export const PUT = handle(app);
export default app;
export type ApiRoutes = typeof apiRoutes;
