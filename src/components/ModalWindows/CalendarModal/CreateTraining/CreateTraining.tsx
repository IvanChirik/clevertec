import { FC } from "react";
import { CreateTrainingType } from "./CreateTraining.props";
import { Button, Image, Modal } from "antd";
import ExercisesCard from '@public/icons/exercises-card-icon.svg';


export const CreateTraining: FC<CreateTrainingType> = ({ open, onCancel, selectedDate }) => {
    return <Modal
        style={{
            fontSize: '14px',
            fontWeight: '700',
            maxWidth: '312px',
        }}
        bodyStyle={{
            textAlign: 'center'
        }}
        title={<div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}>
            <div>
                Тренировки на {selectedDate?.format('DD.MM.YYYY')}
            </div>
            <div>Нет активных тренировок</div>
        </div>}
        mask={false}
        centered
        open={open}
        onCancel={onCancel}
        footer={[
            <Button
                style={{
                    width: '100%'
                }}
                type="primary">Создать тренировку</Button>
        ]}
    >
        <Image src={ExercisesCard} preview={false}></Image>
    </Modal>
};

