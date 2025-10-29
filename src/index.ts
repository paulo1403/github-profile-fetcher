import { Elysia } from "elysia";
import registerGithubRoutes from "./routes/github";

const app = new Elysia();

registerGithubRoutes(app);

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT);

console.log(`Server running at http://localhost:${PORT}`);
