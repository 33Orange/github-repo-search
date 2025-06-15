import { FaGithubSquare } from "react-icons/fa";

import styles from "./style.module.scss";

const stats = [
    { title: '⭐ Stars', value: '' },
    { title: '📝 Language', value: '' },
    { title: '📅 Created', value: '' },
    { title: '❗Open Issues', value: '' },
];

export const RepositoryInfoSkeleton = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.textContainer}>
                    <h1 className={styles.title}></h1>
                    <p className={styles.description}></p>
                </div>


                <FaGithubSquare className={styles.icon}/>
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