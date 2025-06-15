import { cacheService } from "@/services/cache";
import { githubApiService } from "@/services/githubApi";
import { Repository, SearchReposResponse } from "@/types/github";

class GithubController {
    async searchRepositories(
        query: string,
        page: number,
        perPage: number,
        signal?: AbortSignal
    ) {
        const cacheKey = `search:${query}:${page}:${perPage}`;
        const cached = cacheService.get<SearchReposResponse>(cacheKey);
        
        if (cached) {
            return cached;
        }
        
        const data = await githubApiService.searchRepositories(query, page, perPage, signal);
        
        cacheService.set(cacheKey, data);
        return data;
    }
    
    async getRepositoryDetails(
        owner: string,
        name: string,
        signal?: AbortSignal
    ) {
        const cacheKey = `getRepo:${owner}:${name}`;
        const cached = cacheService.get<Repository>(cacheKey);

        if (cached) {
            return cached;
        }
        
        const data = await githubApiService.getRepositoryDetails(owner, name, signal);
        
        cacheService.set(cacheKey, data);
        return data;
    }
}

export const githubController = new GithubController();