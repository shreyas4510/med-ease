import * as Yup from 'yup';
export interface formDataType {
    label: string;
    name: string;
    type: string;
    className: string;
    isSearchable?: boolean;
    options?: Array<{
        value: string;
        label: string;
    }>;
    onSearch?: (search: string) => void
    onChange?: (id: string, values: Record<string, string>) => void
}

export interface TProps {
    title: string;
    top: string;
    formData: formDataType[];
    handleReset: () => void;
    handleSubmit: ( values: Record<string, string> ) => void;
    validationSchema: Yup.Schema;
    initialValues: Record<string, string>;
    handleLoginState?: ( values: string ) => void;
    loginState?: string;
}
