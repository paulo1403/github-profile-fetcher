import { Elysia } from "elysia";
import githubRoutes from "./routes/github";
import errorPlugin from "./plugins/error";
import logger from "./utils/logger";

const app = new Elysia().use(errorPlugin).use(githubRoutes);

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
	logger.info("Server started", { port: PORT });
	console.log(`Server running at http://localhost:${PORT}`);
});
