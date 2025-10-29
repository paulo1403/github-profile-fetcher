import type { Elysia } from "elysia";
import { fetchProfile, clearCache } from "../services/githubService";

export default function registerGithubRoutes(app: Elysia) {
	app.get("/api/github/:username", async ({ params }) => {
		const profile = await fetchProfile(params.username as string);
		if (!profile)
			return new Response(JSON.stringify({ error: "User not found" }), {
				status: 404,
				headers: { "content-type": "application/json" },
			});
		return profile;
	});

	app.post("/api/github/:username/clear-cache", ({ params }) => {
		clearCache(params.username as string);
		return { ok: true };
	});

	app.post("/api/github/clear-cache", () => {
		clearCache();
		return { ok: true };
	});
}
