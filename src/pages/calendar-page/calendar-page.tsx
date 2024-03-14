import { FC, useEffect, useState } from 'react';
import { CalendarHeader } from './';
import type { Moment } from 'moment';
import moment from 'moment';
import { Loader } from '@components/UI/Loader/Loader';
import { Calendar, ConfigProvider, Grid } from 'antd';
import ru from 'antd/es/locale/ru_RU'
import { ErrorStatus500 } from '@components/ModalWindows/FeedbackModal';
import { useModalWindow } from '@hooks/use-modal-windows';
import { useGetTrainingDataQuery } from '@services/training-service';
import { NotFoundTrainingCatalog } from '@components/ModalWindows/CalendarModal/NotFoundTrainingCatalog/NotFoundTrainingCatalog';
import { useGetCatalogTrainingListDataMutation } from '@services/catalog-service';
import { CreateTraining } from '@components/ModalWindows/CalendarModal/CreateTraining/CreateTraining';


const { useBreakpoint } = Grid;


const CalendarPage: FC = () => {
    const { data, isLoading, isError } = useGetTrainingDataQuery();
    const [trainingList, { data: trainingData, isError: isCatalogError }] = useGetCatalogTrainingListDataMutation();
    const screens = useBreakpoint();
    const locale = ru;
    const [selectedDate, setSelectedDate] = useState(moment(new Date()));
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
        console.log(selectedDate.format('YYYY-MMMM-DD'))
    }, [selectedDate])
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
        setSelectedDate(value);
        showCreate();
    };
    const dateCellRender = (value: Moment) => {
        return (
            <div style={{ width: '100%', height: '100%' }} onClick={() => handleDateClick(value)}>
            </div>
        );
    };

    return (<>
        {isLoading && <Loader />}
        <CalendarHeader />
        {!isLoading && !isError && <div style={{
            padding: '0px 24px 24px 24px',
            backgroundColor: "#F0F5FF"
        }}>
            <ConfigProvider
                locale={locale}>
                <Calendar
                    fullscreen={!screens.xs}
                    dateCellRender={dateCellRender}
                    value={selectedDate} />
            </ConfigProvider>
            <CreateTraining
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
    </>
    );
};

export default CalendarPage;