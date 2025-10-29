import type { GithubProfile } from "../types/github";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const CACHE_TTL = 60 * 1000;
const cache = new Map<string, { profile: GithubProfile; expires: number }>();

export async function fetchProfile(
	username: string,
): Promise<GithubProfile | null> {
	const key = username.toLowerCase();
	const now = Date.now();

	const cached = cache.get(key);
	if (cached && cached.expires > now) return cached.profile;

	const headers: Record<string, string> = {
		Accept: "application/vnd.github+json",
	};

	if (GITHUB_TOKEN) headers.Authorization = `Bearer ${GITHUB_TOKEN}`;

	const res = await fetch(
		`https://api.github.com/users/${encodeURIComponent(username)}`,
		{ headers },
	);

	if (res.status === 404) return null;
	if (!res.ok)
		throw new Error(`GitHub API error: ${res.status} ${await res.text()}`);

	const profile = (await res.json()) as GithubProfile;
	cache.set(key, { profile, expires: now + CACHE_TTL });

	return profile;
}

export function clearCache(username?: string) {
	if (username) cache.delete(username.toLowerCase());
	else cache.clear();
}
