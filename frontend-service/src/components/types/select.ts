export interface SelectProps {
    name: string,
    options: Array<{
        value: string;
        label: string;
    }>,
    onSearch?: (search: string) => void,
    setFieldValue: ( name: string, option: string ) => void;
}
