import { Button, Modal } from "antd";
import { FC } from "react";
import { NotFoundTrainingCatalogType } from "./NotFoundTrainingCatalog.props";
import { CloseCircleTwoTone } from "@ant-design/icons";



export const NotFoundTrainingCatalog: FC<NotFoundTrainingCatalogType> = ({ open, onCancel, getCatalogTraining }) => {

    return <Modal
        style={{
            maxWidth: 'clamp(300px, 100%,384px)',
            width: '100%'
        }}
        title={<><CloseCircleTwoTone style={{
            width: '25px',
            height: '25px'
        }} /> <span>При открытии данных произошла ошибка</span></>}
        centered
        open={open}
        onCancel={onCancel}
        footer={[<Button key="submit" type="primary" onClick={getCatalogTraining}>
            Обновить
        </Button>,]}>
        <span>Попробуйте ещё раз</span>
    </Modal>
};