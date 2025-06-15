type Props = {
    url: string,
    headers: HeadersInit,
    errorMsgFactory?: ((status: number) => string),
    signal?: AbortSignal,
}

export const fetchWrapper = async<T>({ url, headers, errorMsgFactory, signal }: Props): Promise<T> => {
    let data: T;
    
    try {
        const response = await fetch(url, { headers, signal });

        if (!response.ok) {
            const status = response.status;
            let msg = `Unexpected error with status: ${status}`;
            
            if (errorMsgFactory) {
                msg = errorMsgFactory(status);
            }
            
            throw new Error(msg);
        }

        data = (await response.json()) as T;
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`Request failed for ${url}:`, message);
    
        throw new Error(message);
    }

    return data;
};

