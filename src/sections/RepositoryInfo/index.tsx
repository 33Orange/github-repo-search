import { useMemo } from "react";
import { FaGithubSquare } from "react-icons/fa";

import { Repository } from "@/types/github";

import styles from "./style.module.scss";

type Props = {
    repository: Repository;
};

export const RepositoryInfo = ({ repository }: Props) => {
    const stats = useMemo(() => ([
        { title: '⭐ Stars', value: repository.stargazers_count },
        { title: '📝 Language', value: repository.language },
        { title: '📅 Created', value: new Date(repository.created_at).toLocaleDateString() },
        { title: '❗Open Issues', value: repository.open_issues },
    ]), [repository]);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>{repository.full_name}</h1>
                    <p className={styles.description}>{repository.description}</p>
                </div>

                <a
                    href={repository.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                >

                    <FaGithubSquare className={styles.icon} />
                </a>
            </header>

            <ul className={styles.statsList}>
                {stats.map((item, i) => (
                    <li key={`${item.title}_${i}`}>
                        <span className={styles.statLabel}>
                            {item.title}
                        </span>

                        <span className={styles.statValue}>
                            {item.value}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};