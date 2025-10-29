import { Elysia } from "elysia";
import { githubRoutes } from "./routes/github";
import errorPlugin from "./plugins/error";
import loggerPlugin from "./plugins/logger";
import logger from "./utils/logger";

const app = new Elysia().use(errorPlugin).use(loggerPlugin).use(githubRoutes);

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
	logger.info("Server started", { port: PORT });
	console.log(`Server running at http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
	logger.info("Received SIGINT, shutting down");
	try {
		const maybeShutdown = (app as unknown) as { shutdown?: () => Promise<void> };
		await maybeShutdown.shutdown?.();
	} catch (err) {
		logger.error("Error during shutdown", { err: String(err) });
	}
	logger.info("Server stopped");
	process.exit(0);
});
