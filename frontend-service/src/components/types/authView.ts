interface formDataType {
    label: string;
    type: string;
    className: string;
}

export interface TProps {
    title: string;
    top: string;
    formData: formDataType[];
    handleReset: () => void;
}
