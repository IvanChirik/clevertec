import { Button, Modal, Result } from "antd";
import { FC } from "react";
import { IErrorModal } from "./ErrorModal.props";


export const ErrorModal: FC<IErrorModal> = ({ open, closeNewReviewModal, closeHandler }) => {

    const closeModal = () => {
        closeNewReviewModal();
        closeHandler();
    }

    return <Modal
        closable={false}
        centered
        bodyStyle={{
            padding: '0px'
        }}
        open={open}
        footer={[]}><Result
            status="error"
            title="Данные не сохранились"
            subTitle="Что-то пошло не так. Попробуйте ещё раз."
            extra={[
                <Button
                    onClick={closeHandler}
                    type="primary" >
                    Написать отзыв
                </Button>,
                <Button
                    onClick={closeModal} >Закрыть</Button>,
            ]}
        ></Result></Modal>
};
