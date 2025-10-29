import type { Elysia } from "elysia";
import { fetchProfile, clearCache } from "../services/githubService";
import logger from "../utils/logger";
import { withErrorHandling } from "../middlewares/errorHandler";

export default function registerGithubRoutes(app: Elysia) {
	app.get(
		"/api/github/:username",
		withErrorHandling(async ({ params }) => {
			const username = params.username as string;
			logger.info("Request - fetch profile", { username });
			const profile = await fetchProfile(username);
			if (!profile)
				return new Response(JSON.stringify({ error: "User not found" }), {
					status: 404,
					headers: { "content-type": "application/json" },
				});
			return profile;
		}),
	);

		app.post(
			"/api/github/:username/clear-cache",
			withErrorHandling(async ({ params }) => {
				const username = params.username as string;
				clearCache(username);
				logger.info("Cache cleared for user", { username });
				return { ok: true };
			}),
		);

		app.post(
			"/api/github/clear-cache",
			withErrorHandling(async () => {
				clearCache();
				logger.info("Cleared all cache");
				return { ok: true };
			}),
		);
}
