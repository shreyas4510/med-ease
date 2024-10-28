import { Modal } from "@mui/material"
import { CustomModalProps } from "./types/modal"
import Button from "./button"

const CustomModal = ({
    open,
    title,
    onSuccess,
    onClose,
    children,
    className
}: CustomModalProps) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            className={`mx-auto mt-16 border-0 ${className}`}
        >
            <div className="p-5 bg-white rounded">
                <div className="text-start text-primary font-poppins text-3xl mb-5">{title}</div>
                {children}
                <div className="mt-5 flex justify-end">
                    <Button className="bg-close-btn text-white me-4" onClick={onClose}>Close</Button>
                    <Button className="bg-custom-gradient text-white ms-4" onClick={onSuccess}>Add</Button>
                </div>
            </div>
        </Modal>
    )
}

export default CustomModal;
