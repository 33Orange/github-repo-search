import { notFound } from "next/navigation";

import { githubController } from "@/controllers/githubController";
import { RepositoryInfo } from "@/sections/RepositoryInfo";
import styles from "@/styles/page.module.scss";


export default async function RepoDetailPage({
    params,
}: {
    params: Promise<{
        owner: string;
        name: string;
    }>;
}) {
    const { owner, name } = await params;

    try {
        const repo = await githubController.getRepositoryDetails(owner, name);

        return (
            <main className={styles.page}>
                <RepositoryInfo repository={repo} />
            </main>
        );
    } catch {
        return notFound();
    }
}