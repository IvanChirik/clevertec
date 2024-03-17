import { FC, useEffect, useState } from 'react';
import { CalendarHeader } from './';
import type { Moment } from 'moment';
import moment from 'moment';
import { Loader } from '@components/UI/Loader/Loader';
import { Badge, Calendar, Grid } from 'antd';
import { ErrorStatus500 } from '@components/ModalWindows/FeedbackModal';
import { useModalWindow } from '@hooks/use-modal-windows';
import { useGetTrainingDataQuery } from '@services/training-service';
import { NotFoundTrainingCatalog } from '@components/ModalWindows/CalendarModal/NotFoundTrainingCatalog/NotFoundTrainingCatalog';
import { useGetCatalogTrainingListDataMutation } from '@services/catalog-service';
import { CreateTraining } from '@components/ModalWindows/CalendarModal/CreateTraining/CreateTraining';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingActions } from '@redux/training.slice';
import { CreateError } from '@components/ModalWindows/CalendarModal/CreateError/CreateError';
import { colorTraining } from '@src/types/training.types';



const { useBreakpoint } = Grid;


const CalendarPage: FC = () => {
    const { data, isLoading, isError } = useGetTrainingDataQuery();
    const dispatch = useAppDispatch();
    const [trainingList, { data: trainingData, isError: isCatalogError }] = useGetCatalogTrainingListDataMutation();
    const screens = useBreakpoint();
    const { trainigList: training, errorModalVisible } = useAppSelector(s => s.training);
    console.log(training)
    const [selectedDate, setSelectedDate] = useState(moment(new Date()));
    const [previousDate, setPreviousDate] = useState(moment(new Date()));
    const { isModalOpen, showModal } = useModalWindow();
    const { isModalOpen: isCreateOpen,
        showModal: showCreate,
        handleCancel: handleCreate } = useModalWindow();
    const {
        isModalOpen: isErrorModal,
        showModal: showErrorModal,
        handleCancel: handleErrorModal
    } = useModalWindow();
    useEffect(() => {
        if (data) {
            trainingList();
            console.log(data);
        }
        if (isError)
            showModal();
    }, [data, isError]);
    useEffect(() => {
        if (trainingData) {
            console.log(trainingData);
        }
        if (isCatalogError) {
            showErrorModal();
        }
    }, [trainingData, isCatalogError]);

    const handleDateClick = (value: Moment) => {
        if (new Date(value.format('YYYY-MM-DD')).getMonth() === new Date(previousDate.format('YYYY-MM-DD')).getMonth()) {
            setSelectedDate(value);
            dispatch(trainingActions.setSelectedDate(value));
            showCreate();
            return;
        }
        setPreviousDate(value);
        return
    };
    const dateCellRender = (value: Moment) => {
        return <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }} onClick={() => handleDateClick(value)}>
            {training.map(i => {
                if (value.date() === new Date(i.date).getDate() && value.month() === new Date(i.date).getMonth()
                    &&
                    trainingData?.length)
                    return <Badge color={colorTraining[`${i.name}`]} text={i.name} />
            })}
        </div>
    };

    return (<>
        {isLoading && <Loader />}
        <CalendarHeader />
        {!isLoading && !isError && <div style={{
            padding: '0px 24px 24px 24px',
            backgroundColor: "#F0F5FF"
        }}>
            <Calendar
                fullscreen={!screens.xs}
                dateCellRender={dateCellRender}
                value={selectedDate} />
            <CreateTraining
                close={handleCreate}
                open={isCreateOpen}
                onCancel={handleCreate}
                selectedDate={selectedDate}
            />
        </div>
        }
        {isError && <ErrorStatus500
            open={isModalOpen}
        />}
        {<NotFoundTrainingCatalog
            getCatalogTraining={trainingList}
            open={isErrorModal}
            onCancel={handleErrorModal}
        />}
        <CreateError open={errorModalVisible} />
    </>
    );
};

export default CalendarPage;