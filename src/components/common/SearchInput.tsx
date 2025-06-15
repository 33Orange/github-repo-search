import { TextInput } from '@mantine/core';
import { CiSearch } from "react-icons/ci";

type Props = {
    placeholder: string;
    label?: string;
    description?: string;
    onChangeValue?: (value: string) => void;
    className?: string;
}

export const SearchInput = ({
    label,
    placeholder,
    description,
    onChangeValue,
    className,
}: Props) => {

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (onChangeValue) {
            onChangeValue(value);
        }
    };

    return (
        <TextInput
            label={label}
            description={description}
            placeholder={placeholder}
            onChange={onChangeHandler}
            className={className}
            leftSection={<CiSearch />}
        />
    );
};