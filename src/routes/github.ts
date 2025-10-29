import { Elysia } from "elysia";
import { fetchProfile, clearCache } from "../services/githubService";
import logger from "../utils/logger";

export const githubRoutes = new Elysia()
	.get("/api/github/:username", async ({ params }) => {
		const username = params.username as string;
		logger.info("Request - fetch profile", { username });
		const profile = await fetchProfile(username);
		if (!profile)
			return new Response(JSON.stringify({ error: "User not found" }), {
				status: 404,
				headers: { "content-type": "application/json" },
			});
		return profile;
	})
	.post("/api/github/:username/clear-cache", async ({ params }) => {
		const username = params.username as string;
		clearCache(username);
		logger.info("Cache cleared for user", { username });
		return { ok: true };
	})
	.post("/api/github/clear-cache", async () => {
		clearCache();
		logger.info("Cleared all cache");
		return { ok: true };
	});

export default githubRoutes;


