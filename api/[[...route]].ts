import { Hono } from "hono";
import { logger } from "hono/logger";
import { handle } from "hono/vercel";
import { employeeRoute } from "./routes/employee";

export const config = {
  runtime: "edge",
};

// 使用普通的 Hono 实例
const app = new Hono();

app.use("*", logger());

const apiRoutes = app.basePath("/api")
  .route("/employee", employeeRoute);

app.all("*", (c) => c.text("404: Not Found"));

export const GET = handle(app);
export const PUT = handle(app);
export default app;
export type ApiRoutes = typeof apiRoutes;
