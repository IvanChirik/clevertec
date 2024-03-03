import { useState } from "react";


export const useModalWindow = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return {
        showModal,
        handleCancel,
        isModalOpen
    }
}