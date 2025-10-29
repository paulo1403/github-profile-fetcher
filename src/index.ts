import { Elysia } from "elysia";
import registerGithubRoutes from "./routes/github";
import errorHandler from "./middlewares/errorHandler";
import logger from "./utils/logger";

const app = new Elysia();

errorHandler(app);

registerGithubRoutes(app);

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT);

logger.info("Server started", { port: PORT });
console.log(`Server running at http://localhost:${PORT}`);
