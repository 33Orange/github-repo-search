import { Alert } from '@mantine/core';
import React from 'react';
import { createPortal } from 'react-dom';

import styles from './style.module.scss';

type Props = {
    error: string;
};

export const AlertNotification = ({ error }: Props) => {
    return (
        createPortal(
            (
                <div className={styles.container}>
                    <Alert color="red" className={styles.alert}>
                        {error}
                    </Alert>
                </div>
            ),
            document.body
        )
    );
};