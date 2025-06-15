import Link from "next/link";
import { FaGithubSquare } from "react-icons/fa";

import styles from "./style.module.scss";

export const Header = () => {

    return (
        <header className={styles.header}>
            <Link href="/" className={styles.link}>
                <FaGithubSquare className={styles.icon} />

                <h1>🔍 GitHub repo search</h1>
            </Link>
        </header>
    );
};

