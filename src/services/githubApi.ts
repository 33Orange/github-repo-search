import { fetchWrapper } from "@/helpers/fetchWrapper";
import { Repository, SearchReposResponse } from "@/types/github";

const BASE_GITHUB_URL = 'https://api.github.com';

export const GITHUB_SEARCH_URL = `${BASE_GITHUB_URL}/search`;
export const GITHUB_REPOS_URL = `${BASE_GITHUB_URL}/repos`;

class GithubApiService {
    async searchRepositories(
        query: string,
        page: number,
        perPage: number,
        signal?: AbortSignal
    ) {
        const params = new URLSearchParams({
            q: query,
            page: String(page),
            per_page: String(perPage),
        });
        
        const errorMsgFactory = (status: number) => status === 403
            ? "GitHub API rate limit exceeded"
            : `GitHub API error: ${status}`;
        
        const data = await fetchWrapper<SearchReposResponse>({
            url: `${GITHUB_SEARCH_URL}/repositories?${params}`,
            headers: { Accept: "application/vnd.github.v3+json" },
            errorMsgFactory,
            signal,
        });
        
        return data;
    }
    
    async getRepositoryDetails(
        owner: string,
        name: string,
        signal?: AbortSignal
    ) {
        const errorMsgFactory = (status: number) => `Failed to fetch repository: ${status}`;
        
        const data = await fetchWrapper<Repository>({
            url: `${GITHUB_REPOS_URL}/${owner}/${name}`,
            headers: { Accept: 'application/vnd.github.v3+json' },
            errorMsgFactory,
            signal,
        });
        
        return data;
    }
}

export const githubApiService = new GithubApiService();