import { FC } from "react";
import { CalendarDropdownType } from "./CalendarDropdown.props";
import { Dropdown, MenuProps, Space } from "antd";
import { ArrowLeftOutlined, DownOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { trainingActions } from "@redux/training.slice";
import { TrainingName } from "@src/types/training.types";


export const CalendarDropdown: FC<CalendarDropdownType> = ({ closeCategoryModal, writedTrainings }) => {
    const { trainingType } = useAppSelector(s => s.training.selectedDate)
    const trainingList = useAppSelector(s => s.catalogs.catalogTrainigList);
    const dispatch = useAppDispatch();
    const exitHandler = () => {
        closeCategoryModal();
        dispatch(trainingActions.setIsExerciseEdit(false));
    }
    const items:
        {
            label: string,
            key: string
        }[] = trainingList
            .filter(category => !writedTrainings.includes(category.name))
            .map(category => { return { label: category.name, key: category.key } });
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case 'legs':
                dispatch(trainingActions.setSelectedTraining(TrainingName.Legs));
                break;
            case 'hands':
                dispatch(trainingActions.setSelectedTraining(TrainingName.Hands));
                break;
            case 'strength':
                dispatch(trainingActions.setSelectedTraining(TrainingName.Power));
                break;
            case 'back':
                dispatch(trainingActions.setSelectedTraining(TrainingName.Back));
                break;
            case 'chest':
                dispatch(trainingActions.setSelectedTraining(TrainingName.Chest));
                break;
        }
    }

    return (
        <Dropdown
            menu={{
                items,
                onClick: handleMenuClick
            }}
            trigger={['click']}>
            <Space style={{
                width: '100%',
                color: 'black',
                justifyContent: 'space-between'
            }}>
                <div
                    style={{
                        display: 'flex',
                        gap: '10px'
                    }}>
                    <ArrowLeftOutlined
                        onClick={exitHandler} />
                    {trainingType ? trainingType : 'Выбор типа тренировки'}
                </div>
                <DownOutlined />
            </Space>
        </Dropdown>
    );
};

