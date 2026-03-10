import express, { Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import cors from "cors";
import helmet from "helmet";

const app = express();
const httpServer = createServer(app);

/* Extend Request interface */
declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

/* Security middleware */
app.use(helmet());
app.use(cors());

/* Body parsing */
app.use(
  express.json({
    verify: (req, _res, buf) => {
      (req as any).rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));

/* Logger */
export function log(message: string, source = "server") {
  const formattedTime = new Date().toLocaleTimeString();

  console.log(`[${formattedTime}] [${source}] ${message}`);
}

/* Request logger */
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    if (req.path.startsWith("/api")) {
      log(`${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
    }
  });

  next();
});

(async () => {
  /* Register API routes */
  await registerRoutes(httpServer, app);

  /* Error handler */
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    console.error("Server Error:", err);

    if (res.headersSent) {
      return next(err);
    }

    res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
    });
  });

  /* Production vs Development setup */
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  /* Start server */
  const PORT = Number(process.env.PORT) || 5000;

  httpServer.listen(PORT, "0.0.0.0", () => {
    log(`Server running on http://localhost:${PORT}`);
  });
})();