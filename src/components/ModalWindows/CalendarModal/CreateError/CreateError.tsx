import { Button, Modal } from "antd";
import { FC } from "react";
import { CloseCircleTwoTone } from "@ant-design/icons";
import { CreateErrorType } from "./CreateError.props";
import { useAppDispatch } from "@hooks/typed-react-redux-hooks";
import { trainingActions } from "@redux/training.slice";



export const CreateError: FC<CreateErrorType> = ({ open, onCancel }) => {
    const dispatch = useAppDispatch();

    return <Modal
        style={{
            maxWidth: 'clamp(300px, 100%,384px)',
            width: '100%'
        }}
        title={<><CloseCircleTwoTone
            twoToneColor={'#ff4d4f'}
            style={{
                width: '25px',
                height: '25px'
            }} /> <span>При сохранении данных произошла ошибка</span></>}
        centered
        closable={false}
        open={open}
        onCancel={onCancel}
        footer={[<Button key="submit" type="primary" onClick={() => dispatch(trainingActions.setErrorModalVisible(false))}>
            Закрыть
        </Button>,]}>
        <span>Придётся попробовать ещё раз</span>
    </Modal>
};