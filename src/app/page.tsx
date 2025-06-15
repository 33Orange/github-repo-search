import { RepositorySearch } from "@/sections/RepositorySearch";
import styles from "@/styles/page.module.scss";


export default function Home() {
    return (
        <main className={styles.page}>
            <RepositorySearch />
        </main>
    );
}
