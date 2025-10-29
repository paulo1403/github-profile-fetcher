export type GithubProfile = {
	login: string;
	name?: string;
	avatar_url?: string;
	html_url: string;
	bio?: string;
	public_repos: number;
	followers: number;
	following: number;
};
