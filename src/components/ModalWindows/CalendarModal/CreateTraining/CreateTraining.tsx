import { FC, useEffect, useState } from "react";
import { CreateTrainingType } from "./CreateTraining.props";
import { Button, Image, Modal, Row } from "antd";
import ExercisesCard from '@public/icons/exercises-card-icon.svg';
import { CalendarDropdown } from "@components/Dropdown/CalendarDropdown/CalendarDropdown";
import CalendarDrawer from "@components/Drawer/CalendarDrawer/CalendarDrawer";
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { trainingActions } from "@redux/training.slice";
import { EditTwoTone } from "@ant-design/icons";


export const CreateTraining: FC<CreateTrainingType> = ({ open, onCancel, selectedDate }) => {
    const dispatch = useAppDispatch();
    const { trainingType, exercises } = useAppSelector(s => s.training.selectedDate)
    const [isTrainingType, setIsTrainingType] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handlerCloseModal = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        onCancel?.(e);
        dispatch(trainingActions.clearSelectedDate());
    }
    useEffect(() => {
        if (!isTrainingType)
            dispatch(trainingActions.setSelectedTraining(''));
    }, [isTrainingType])

    if (!isTrainingType)
        return <Modal
            maskClosable={false}
            destroyOnClose
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
            onCancel={(e) => handlerCloseModal(e)}
            footer={[
                <Button
                    onClick={() => setIsTrainingType(true)}
                    style={{
                        width: '100%',
                        height: '40px'
                    }}
                    type="primary">Создать тренировку</Button>
            ]}
        >
            <Image src={ExercisesCard} preview={false}></Image>
        </Modal>
    else
        return <>
            <Modal
                maskClosable={false}
                destroyOnClose
                style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    maxWidth: '312px',
                }}
                bodyStyle={{
                    textAlign: 'center'
                }}

                title={<CalendarDropdown closeCategoryModal={() => setIsTrainingType(false)} />}
                closable={false}
                mask={false}
                centered
                open={open}
                onCancel={onCancel}
                footer={[
                    <Button
                        disabled={!trainingType}
                        onClick={() => setIsDrawerOpen(true)}
                        style={{
                            width: '100%',
                            height: '40px'
                        }}
                        type="ghost">Добавить упражнения</Button>,
                    <Button
                        disabled
                        style={{
                            margin: '0px',
                            width: '100%',
                            height: '40px'
                        }}
                        type="link">Сохранить</Button>
                ]}
            >
                {exercises.map(exercise => <Row justify={'space-between'}>{exercise.name}<EditTwoTone /></Row>)}
            </Modal>
            <CalendarDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </>
};

