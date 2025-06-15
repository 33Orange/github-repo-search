"use client";
import { Alert, Transition } from "@mantine/core";
import { CiCircleAlert } from "react-icons/ci";

import { useGlobalStore } from "@/store/globalStore";

import styles from './style.module.scss';

export const GlobalErrors = () => {
    const errors = useGlobalStore((s) => s.errors);
    const removeError = useGlobalStore((s) => s.removeError);

    return (
        <div className={styles.container}>
            {errors.map((err) => (
                <Transition key={err.id} transition="pop" mounted>
                    {(styles) => (
                        <Alert
                            icon={<CiCircleAlert />}
                            title="Error"
                            color="red"
                            style={styles}
                            radius="md"
                            withCloseButton
                            onClose={() => removeError(err.id)}
                        >
                            {err.message}
                        </Alert>
                    )}
                </Transition>
            ))}
        </div>
    );
};