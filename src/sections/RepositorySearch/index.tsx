"use client";
import { useCallback, useRef, useState } from "react";

import { SearchInput } from "@/components/common/SearchInput";
import { RepositoriesList } from "@/components/RepositoriesList";
import { githubController } from "@/controllers/githubController";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useFetch } from "@/hooks/useFetch";
import { useGlobalStore } from "@/store/globalStore";
import { SearchReposResponse } from "@/types/github";

import styles from "./style.module.scss";

const PER_PAGE = 10;
const INITIAL_PAGE = 1;

export const RepositorySearch = () => {
    const setLoading = useGlobalStore((s) => s.setLoading);
    const setError = useGlobalStore((s) => s.setError);

    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebouncedValue(searchQuery, 500);
    const shouldFetch = debouncedSearchQuery.length >= 3;
    const [page, setPage] = useState(INITIAL_PAGE);
    const lastPageRef = useRef(page);
    
    const onSetPage = useCallback((p: number) => {
        if (!shouldFetch) {
            setPage(INITIAL_PAGE);
            return;
        }
        
        setPage(p); 
    }, [shouldFetch]);

    const fetchFn = useCallback(
        (signal: AbortSignal) => githubController.searchRepositories(debouncedSearchQuery, page, PER_PAGE, signal),
        [debouncedSearchQuery, page]
    );
    const onStart = useCallback(() => setLoading(true), [setLoading]);
    const onComplete = useCallback(() => {
        setLoading(false);
        lastPageRef.current = page;
    }, [setLoading, page]);
    const onError = useCallback(
        (e: string) => {
            setError(e);
            onSetPage(lastPageRef.current);
        },
        [setError, onSetPage]
    );

    const { results } = useFetch<SearchReposResponse>({
        fetchFn,
        shouldFetch,
        onStart,
        onComplete,
        onError,
    });

    const onChangeQuery = (value: string) => {
        setSearchQuery(value);
        onSetPage(INITIAL_PAGE);
    };

    return (
        <section className={styles.section}>
            <h1 className={styles.title}>
                🔍 Search GitHub Repositories
            </h1>

            <SearchInput
                placeholder="Enter repository name"
                onChangeValue={onChangeQuery}
                className={styles.searchInput}
            />

            {results && results?.items && (
                <RepositoriesList
                    repositories={results.items}
                    totalCount={results.total_count}
                    currentPage={page}
                    onPageChange={onSetPage}
                    isPaginationDisabled={!shouldFetch}
                />
            )}
        </section>
    );
};
