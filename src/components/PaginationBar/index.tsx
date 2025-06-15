"use client";
import { Pagination } from "@mantine/core";
import { useMediaQuery } from 'react-responsive';

import { PageControl } from '../PageControl';
import styles from './style.module.scss';

type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isDisabled?: boolean;
};

export const PaginationBar = (props: Props) => {
    const isTablet = useMediaQuery({ maxWidth: 724 });

    return (
        <div className={styles.paginationBar} aria-label="pagination bar">
            {isTablet
                ? <MobileComponent {...props} />
                : <DesktopComponent {...props} />
            }
        </div>

    );
};


const DesktopComponent = ({ totalPages, onPageChange, currentPage, isDisabled }: Props) => {
    return (
        <Pagination.Root
            total={totalPages}
            onChange={onPageChange}
            value={currentPage}
            color='gray'
        >
            <div className={styles.container}>
                <div className={styles.prevButtons}>
                    <PageControl
                        type='first'
                        onPageChange={onPageChange}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        isDisabled={isDisabled}
                        className={styles.firstButton}
                    />

                    <PageControl
                        type='prev'
                        onPageChange={onPageChange}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        isDisabled={isDisabled}
                    />
                </div>


                <div className={styles.items}>
                    <Pagination.Items />
                </div>



                <div className={styles.nextButtons}>

                    <PageControl
                        type='next'
                        onPageChange={onPageChange}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        isDisabled={isDisabled}
                    />

                    <PageControl
                        type='last'
                        onPageChange={onPageChange}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        isDisabled={isDisabled}
                        className={styles.lastButton}
                    />
                </div>

            </div>
        </Pagination.Root>
    );
};

const MobileComponent = ({ totalPages, onPageChange, currentPage, isDisabled }: Props) => {
    const isMobile = useMediaQuery({ maxWidth: 524 });
    return (
        <Pagination.Root
            total={totalPages}
            onChange={onPageChange}
            value={currentPage}
            color='gray'
            siblings={isMobile ? 1 : 3}
            size={'sm'}
        >
            <div className={styles.mobileContainer}>
                <div className={styles.mobileItems}>
                    <Pagination.Items />
                </div>

                <div className={styles.mobileButtons}>
                    <Pagination.Previous disabled={isDisabled} />

                    <Pagination.Next disabled={isDisabled} />
                </div>
            </div>
        </Pagination.Root>
    );
};