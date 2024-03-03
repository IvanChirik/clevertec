import { Button, Modal, Result } from "antd";
import { FC } from "react";
import { IErrorStatus500 } from "./ErrorStatus500.props";


export const ErrorStatus500: FC<IErrorStatus500> = ({ open, onCancel }) => {
    return <Modal
        closable={false}
        centered
        bodyStyle={{
            padding: '0px'
        }}
        open={open}
        onOk={onCancel}
        onCancel={onCancel}
        footer={[]}><Result
            status="500"
            title="Что-то пошло не так"
            subTitle="Произошла ошибка, попробуйте ещё раз."
            extra={<Button onClick={onCancel} type="primary">Назад</Button>}
        ></Result></Modal>
};