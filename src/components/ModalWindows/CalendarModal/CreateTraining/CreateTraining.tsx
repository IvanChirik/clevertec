import { FC, useState } from "react";
import { CreateTrainingType } from "./CreateTraining.props";
import { Button, Image, Modal } from "antd";
import ExercisesCard from '@public/icons/exercises-card-icon.svg';
import { CalendarDropdown } from "@components/Dropdown/CalendarDropdown/CalendarDropdown";
import CalendarDrawer from "@components/Drawer/CalendarDrawer/CalendarDrawer";


export const CreateTraining: FC<CreateTrainingType> = ({ open, onCancel, selectedDate }) => {
    const [isTrainingType, setIsTrainingType] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    if (!isTrainingType)
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
                    onClick={() => setIsTrainingType(true)}
                    style={{
                        width: '100%'
                    }}
                    type="primary">Создать тренировку</Button>
            ]}
        >
            <Image src={ExercisesCard} preview={false}></Image>
        </Modal>
    else
        return <>
            <Modal
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
                        onClick={() => setIsDrawerOpen(true)}
                        style={{
                            width: '100%',
                        }}
                        type="ghost">Добавить упражнения</Button>,
                    <Button
                        disabled
                        style={{
                            margin: '0px',
                            width: '100%'
                        }}
                        type="link">Сохранить</Button>
                ]}
            >
            </Modal>
            <CalendarDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </>
};

