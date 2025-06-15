import { useMemo } from 'react';

import { PaginationBar } from "@/components/PaginationBar";
import { RepositoryItem } from "@/components/RepositoryItem";
import { Repository, } from "@/types/github";

import styles from './style.module.scss';

const PER_PAGE = 10;

// GitHub caps at 1000 total results
const MAX_ACCESSIBLE_ITEMS = 1000;

type Props = {
    repositories: Repository[];
    currentPage: number;
    totalCount: number;
    onPageChange: (page: number) => void;
    isPaginationDisabled?: boolean;
}

export const RepositoriesList = ({
    repositories,
    currentPage,
    onPageChange,
    totalCount = 0,
    isPaginationDisabled = false,
}: Props) => {
    const totalPages = useMemo(() => Math.min(
        Math.ceil(totalCount / PER_PAGE),
        Math.floor(MAX_ACCESSIBLE_ITEMS / PER_PAGE)
    ), [totalCount]);

    return (
        <article>
            {totalPages > 1 && (
                <PaginationBar
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    isDisabled={isPaginationDisabled}
                />
            )}

            <ul className={styles.list}>
                {repositories.map((repo) => (
                    <RepositoryItem
                        key={repo.id}
                        repository={repo}
                    />
                ))}
            </ul>
        </article>
    );
};
