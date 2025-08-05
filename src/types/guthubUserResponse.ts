import { GithubUser } from "./githubUser";

export interface GitHubUserSearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: GithubUser[];
  }