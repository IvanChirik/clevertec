import { FC, useEffect, useState } from "react";
import { CreateTrainingType } from "./CreateTraining.props";
import { Badge, Button, Image, Modal, Row } from "antd";
import ExercisesCard from '@public/icons/exercises-card-icon.svg';
import { CalendarDropdown } from "@components/Dropdown/CalendarDropdown/CalendarDropdown";
import CalendarDrawer from "@components/Drawer/CalendarDrawer/CalendarDrawer";
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { trainingActions } from "@redux/training.slice";
import { EditTwoTone } from "@ant-design/icons";
import { useCreateTrainingMutation, useEditTrainingMutation } from "@services/training-service";
import { ExerciseData, TrainingName, colorTraining } from "@src/types/training.types";


export const CreateTraining: FC<CreateTrainingType> = ({ open, onCancel, close, selectedDate }) => {
    const dispatch = useAppDispatch();
    const [exerciseId, setExerciseId] = useState<string>();
    const [createTraining, { isSuccess, isError }] = useCreateTrainingMutation();
    const [editExercise, { isSuccess: isEditSuccess, isError: isEditError }] = useEditTrainingMutation();
    const { trainigList, isExerciseEdit } = useAppSelector(s => s.training);
    const dateTrainingList = trainigList.filter(training =>
        new Date(training.date).getDate() === new Date(selectedDate.format()).getDate() &&
        new Date(training.date).getMonth() === new Date(selectedDate.format()).getMonth());
    const { date, trainingType, exercises } = useAppSelector(s => s.training.selectedDate);
    const catalogList = useAppSelector(s => s.catalogs.catalogTrainigList);
    const [isTrainingType, setIsTrainingType] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handlerCloseModal = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        onCancel?.(e);
        dispatch(trainingActions.clearSelectedDate());
    }
    const createOrEditTraining = () => {
        if (date && trainingType) {
            if (isExerciseEdit && exerciseId) {
                editExercise({ _id: exerciseId, name: trainingType, date: date?.format(), exercises: exercises });
                return;
            }
            createTraining({ name: trainingType, date: date?.format(), exercises: exercises });
        }
    };
    const editTraining = (editExercises: ExerciseData[], trainingName: TrainingName, id: string) => {
        setExerciseId(id);
        dispatch(trainingActions.setSelectedTraining(trainingName));
        dispatch(trainingActions.setSelectedExercises(editExercises));
        dispatch(trainingActions.setIsExerciseEdit(true));
        setIsTrainingType(true);
    }
    useEffect(() => {
        if (!isTrainingType)
            dispatch(trainingActions.setSelectedTraining(undefined));
    }, [isTrainingType]);
    useEffect(() => {
        if (isSuccess || isEditSuccess) {
            setIsTrainingType(false);
            dispatch(trainingActions.setSelectedExercises([]));
        }
        if (isError || isEditError) {
            setIsTrainingType(false);
            close();
            dispatch(trainingActions.setErrorModalVisible(true));
            dispatch(trainingActions.setSelectedExercises([]));
        }
    }, [isError, isSuccess, isEditSuccess, isEditError])

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
                {dateTrainingList.length ? null : <div>Нет активных тренировок</div>}
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
                    disabled={
                        new Date(selectedDate?.format()) <= new Date()
                        ||
                        catalogList.length === dateTrainingList.length || !catalogList.length}
                    type="primary">{dateTrainingList.length ? 'Добавить' : 'Создать'} тренировку</Button>
            ]}
        >
            {
                dateTrainingList.length && catalogList.length ?
                    dateTrainingList.map(trainig =>
                        <Row justify='space-between'>
                            <Badge color={colorTraining[`${trainig.name}`]} text={trainig.name} />
                            <EditTwoTone
                                onClick={() => editTraining(trainig.exercises, trainig.name, trainig._id)}
                            />
                        </Row>) :
                    <Image src={ExercisesCard} preview={false}></Image>}
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

                title={<CalendarDropdown
                    writedTrainings={dateTrainingList.map(training => training.name)}
                    closeCategoryModal={() => setIsTrainingType(false)} />}
                closable={false}
                mask={false}
                centered
                open={open}
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
                        onClick={createOrEditTraining}
                        disabled={!exercises.length}
                        style={{
                            margin: '0px',
                            width: '100%',
                            height: '40px'
                        }}
                        type="link"> Сохранить {isExerciseEdit ? 'изменения' : ''}</Button>
                ]}
            >
                {exercises.map(exercise => <Row justify={'space-between'}>{exercise.name}<EditTwoTone
                    onClick={() => setIsDrawerOpen(true)} /></Row>)}
            </Modal>
            <CalendarDrawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)} />
        </>
};

