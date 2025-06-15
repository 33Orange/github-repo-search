import { cacheService } from "@/services/cache";
import { githubApiService } from "@/services/githubApi";
import { Repository, SearchReposResponse } from "@/types/github";

import { githubController } from "./githubController";

jest.mock("@/services/cache");
jest.mock("@/services/githubApi");

describe("githubController", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("searchRepositories", () => {
        const query = "react";
        const page = 1;
        const perPage = 10;
        const cacheKey = `search:${query}:${page}:${perPage}`;
        const fakeResponse: SearchReposResponse = {
            total_count: 1,
            incomplete_results: false,
            items: [{ id: 1, name: "repo", owner: { login: "user" } }] as Repository[],
        };

        it("returns cached data if present", async () => {
            (cacheService.get as jest.Mock).mockReturnValue(fakeResponse);

            const result = await githubController.searchRepositories(query, page, perPage);

            expect(cacheService.get).toHaveBeenCalledWith(cacheKey);
            expect(result).toBe(fakeResponse);
            expect(githubApiService.searchRepositories).not.toHaveBeenCalled();
        });

        it("calls API and caches result if not cached", async () => {
            (cacheService.get as jest.Mock).mockReturnValue(undefined);
            (githubApiService.searchRepositories as jest.Mock).mockResolvedValue(fakeResponse);

            const result = await githubController.searchRepositories(query, page, perPage);

            expect(cacheService.get).toHaveBeenCalledWith(cacheKey);
            expect(githubApiService.searchRepositories).toHaveBeenCalledWith(query, page, perPage, undefined);
            expect(cacheService.set).toHaveBeenCalledWith(cacheKey, fakeResponse);
            expect(result).toBe(fakeResponse);
        });
    });

    describe("getRepositoryDetails", () => {
        const owner = "user";
        const name = "repo";
        const cacheKey = `getRepo:${owner}:${name}`;
        const fakeRepo = { id: 1, name, owner: { login: owner } } as Repository;

        it("returns cached data if present", async () => {
            (cacheService.get as jest.Mock).mockReturnValue(fakeRepo);

            const result = await githubController.getRepositoryDetails(owner, name);

            expect(cacheService.get).toHaveBeenCalledWith(cacheKey);
            expect(result).toBe(fakeRepo);
            expect(githubApiService.getRepositoryDetails).not.toHaveBeenCalled();
        });

        it("calls API and caches result if not cached", async () => {
            (cacheService.get as jest.Mock).mockReturnValue(undefined);
            (githubApiService.getRepositoryDetails as jest.Mock).mockResolvedValue(fakeRepo);

            const result = await githubController.getRepositoryDetails(owner, name);

            expect(cacheService.get).toHaveBeenCalledWith(cacheKey);
            expect(githubApiService.getRepositoryDetails).toHaveBeenCalledWith(owner, name, undefined);
            expect(cacheService.set).toHaveBeenCalledWith(cacheKey, fakeRepo);
            expect(result).toBe(fakeRepo);
        });
    });
});