import { RepositoryInfoSkeleton } from "@/components/skeletons/RepositoryInfoSkeleton";
import styles from "@/styles/page.module.scss";

export default async function Loading() {
    return (
        <main className={styles.page}>
            <RepositoryInfoSkeleton />
        </main>
    );
}