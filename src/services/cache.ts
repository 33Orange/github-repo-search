type CachePayload<T> = {
    data: T;
    expiresAt: number;
};

const DEFAULT_EXPIRATION_TIME = 1000 * 60 * 5;
const KEY_PREFIX = "appCache:";

const makeKey = (key: string) => KEY_PREFIX + key;

class CacheService {
    private defaultTTL = DEFAULT_EXPIRATION_TIME;

    set<T>(key: string, data: T, ttl = this.defaultTTL) {
        const payload: CachePayload<T> = {
            data,
            expiresAt: Date.now() + ttl,
        };
        
        const keyWithPrefix = makeKey(key);

        try {
            localStorage.setItem(keyWithPrefix, JSON.stringify(payload));
        } catch (err) {
            console.warn(`CacheService: could not set cache for "${keyWithPrefix}" —`, err);
        }
    }

    get<T>(key: string): T | null {
        const keyWithPrefix = makeKey(key);
        try {
            const str = localStorage.getItem(keyWithPrefix);

            if (!str) {
                return null;
            }

            const payload: CachePayload<T> = JSON.parse(str);

            if (Date.now() > payload.expiresAt) {
                localStorage.removeItem(keyWithPrefix);
                return null;
            }

            return payload.data;
        } catch (err) {
            console.warn(`CacheService: could not read cache for "${keyWithPrefix}" —`, err);
            return null;
        }
    }

    clear(key?: string) {
        if (key) {
            const keyWithPrefix = makeKey(key);
            localStorage.removeItem(keyWithPrefix);
        } else {
            localStorage.clear();
        }
    }

    public cleanup() {
        const now = Date.now();
        
        for (let i = 0; i < localStorage.length; i++) {
            const fullKey = localStorage.key(i);
            
            if (!fullKey?.startsWith(KEY_PREFIX)) {
                continue;
            }

            try {
                const entry: CachePayload<unknown> = JSON.parse(localStorage.getItem(fullKey)!);
                
                if (!entry.expiresAt || now > entry.expiresAt) {
                    localStorage.removeItem(fullKey);
                }
            } catch {
                localStorage.removeItem(fullKey);
            }
        }
    }
}

export const cacheService = new CacheService();