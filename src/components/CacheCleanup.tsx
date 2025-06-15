"use client";
import { useEffect } from "react";

import { cacheService } from "@/services/cache";

export const CacheCleanup = () => {
    useEffect(() => {
        cacheService.cleanup();
    }, []);

    return null;
};