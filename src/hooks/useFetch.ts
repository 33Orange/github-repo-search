import { useEffect, useState } from "react";

type FetchFn<T> = (signal: AbortSignal) => Promise<T>;

type Props<T> = {
    fetchFn: FetchFn<T>;
    shouldFetch?: boolean;
    onStart: () => void;
    onError: (e: string) => void;
    onComplete: () => void;
}

export const useFetch = <T>({
    fetchFn,
    shouldFetch = false,
    onStart,
    onError,
    onComplete,
}: Props<T>) => {
    const [results, setResults] = useState<T | null>(null);

    useEffect(() => {
        if (!fetchFn || !shouldFetch) {
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            onStart();

            try {
                const result = await fetchFn(signal);
                
                if (!signal.aborted) {
                    setResults(result);
                }
            } catch (err) {
                if (err instanceof Error && err?.name !== 'AbortError') {
                    onError(err instanceof Error ? err.message : 'An unexpected error occurred');
                }
            } finally {
                if (!signal.aborted) {
                    onComplete();
                }
            }
        };

        fetchData();

        return () => { controller.abort(); };
    }, [fetchFn, shouldFetch, onStart, onError, onComplete]);

    return { results };
};