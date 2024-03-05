import { Button, Modal, Result } from "antd";
import { FC } from "react";
import { ISuccessModal } from "./SuccessModal.props";


export const SuccessModal: FC<ISuccessModal> = ({ open, onCancel }) => {
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
            status="success"
            title="Отзыв успешно опубликован"
            extra={[
                <Button
                    onClick={onCancel}
                    style={{
                        width: '100%'
                    }}
                    type="primary" > Отлично</Button>
            ]}
        ></Result></Modal>
};