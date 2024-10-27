import { ReactNode } from "react";

export interface CustomModalProps {
    open: boolean;
    title: string;
    onSuccess: () => void;
    onClose: () => void;
    children: ReactNode;
    className: string;
}
