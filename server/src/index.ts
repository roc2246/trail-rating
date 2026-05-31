import express from "express";
import path from "path";
import routes from "./routes";
import { connectDB } from "./db";
import { errorMiddleware } from "./middleware";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", routes);

app.use(errorMiddleware);

// In development, proxy non-API requests to the Vite dev server.
if (process.env.NODE_ENV === "development") {
  // Require here so production build doesn't need the dev-only dependency.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { createProxyMiddleware } = require("http-proxy-middleware");

  app.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:5173",
      changeOrigin: true,
      ws: true,
      logLevel: "warn",
    })
  );
} else {
  // In production, serve the built client from packages/client/dist
  const clientBuildPath = path.resolve(
    __dirname,
    "..",
    "..",
    "client",
    "dist"
  );

  app.use(express.static(clientBuildPath));

  app.get("*", function (_req, res) {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

async function startServer(): Promise<void> {
  try {
    await connectDB();

    app.listen(port, function () {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

export default app;