import { Button, Pagination } from "@mantine/core";

type Props = {
    type: "first" | "prev" | "next" | "last";
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isDisabled?: boolean;
    className?: string;
};

const Map = {
    first: Pagination.First,
    prev: Pagination.Previous,
    next: Pagination.Next,
    last: Pagination.Last,
} as const;

const Label = {
    first: "First",
    prev: "Prev",
    next: "Next",
    last: "Last",
} as const;

export const PageControl = ({
    type,
    currentPage,
    totalPages,
    onPageChange,
    isDisabled = false,
    className,
}: Props) => {

    const targetPage = (() => {
        switch (type) {
            case "first":
                return 1;
            case "prev":
                return currentPage - 1;
            case "next":
                return currentPage + 1;
            case "last":
                return totalPages;
        }
    })();

    const Disabled = isDisabled ||
        (type === "first" || type === "prev"
            ? currentPage <= 1
            : currentPage >= totalPages);

    const PaginationComponent = Map[type];

    return (
        <PaginationComponent
            className={className}
            component={() => (
                <Button
                    variant="default"
                    onClick={() => onPageChange(targetPage)}
                    disabled={Disabled}
                    size='xs'
                >
                    {Label[type]}
                </Button>
            )}
        />
    );
};