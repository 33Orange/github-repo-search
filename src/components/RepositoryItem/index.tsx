
import React from 'react';
import { CiStar } from "react-icons/ci";

import { Repository } from '@/types/github';

import styles from './styles.module.scss';

type Props = {
    repository: Repository;
};

export const RepositoryItem = ({ repository }: Props) => {
    const href = `/repository/${repository.owner.login}/${repository.name}`;

    return (
        <li className={styles.item}>
            <div className={styles.titleContainer}>
                <h2 className={styles.title}>
                    {repository.full_name}
                </h2>

                <div className={styles.starContainer}>
                    <CiStar className={styles.star} color='gold' />
                    
                    <span className={styles.countText}>
                        {repository.stargazers_count}
                    </span>
                </div>
            </div>

            <p className={styles.description}>
                {repository.description}
            </p>

            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
            />
        </li>
    );
};