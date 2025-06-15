"use client";
import { Loader } from "@mantine/core";

import { useGlobalStore } from "@/store/globalStore";

import styles from './style.module.scss';

export const GlobalLoader = () => {
    const isLoading = useGlobalStore((s) => s.isLoading);

    if (!isLoading) {
        return null;
    }

    return (
        <div className={styles.container}>
            <Loader size="lg" />
        </div>
    );
};