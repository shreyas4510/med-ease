import * as Yup from 'yup';
interface formDataType {
    label: string;
    name: string;
    type: string;
    className: string;
}

export interface TProps {
    title: string;
    top: string;
    formData: formDataType[];
    handleReset: () => void;
    handleSubmit: () => void;
    validationSchema: Yup.Schema;
    initialValues: Record<string, string>;
}
