import { FC, useEffect, useState } from 'react';
import { CalendarHeader } from './';
import type { Moment } from 'moment';
import moment from 'moment';
import { Loader } from '@components/UI/Loader/Loader';
import { Calendar, ConfigProvider, Grid, Modal } from 'antd';
import ru from 'antd/es/locale/ru_RU'
import { ErrorStatus500 } from '@components/ModalWindows/FeedbackModal';
import { useModalWindow } from '@hooks/use-modal-windows';
import { useGetTrainingDataQuery } from '@services/training-service';
import { useGetCatalogTrainingListDataQuery } from '@services/catalog-service';


const { useBreakpoint } = Grid;


const CalendarPage: FC = () => {
    const [isTrainingData, setIsTrainingData] = useState(false);
    const { data, isLoading, isError } = useGetTrainingDataQuery();
    const { data: catalogData, isError: isCatalogError } = useGetCatalogTrainingListDataQuery(isTrainingData);
    const screens = useBreakpoint();
    const locale = ru;
    const [selectedDate, setSelectedDate] = useState(moment(new Date()));
    const [modalVisible, setModalVisible] = useState(false);
    const { isModalOpen: isErrorModalOpen, showModal: showErrorModal, } = useModalWindow();
    useEffect(() => {
        console.log(selectedDate.format('YYYY-MMMM-DD'))
    }, [selectedDate])
    useEffect(() => {
        if (data) {
            console.log(data)
            setIsTrainingData(true);
        }
        if (isError)
            showErrorModal();
    }, [data, isError]);
    useEffect(() => {
        if (catalogData) {
            console.log(catalogData);
        }
        if (isCatalogError) {
            console.log('error');
        }
    }, [catalogData, isCatalogError]);

    const handleDateClick = (value: Moment) => {
        setSelectedDate(value);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
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
            <Modal
                mask={false}
                centered
                open={modalVisible}
                onCancel={handleModalClose}
                footer={null}
            >
                Вы выбрали дату: {selectedDate?.format('YYYY-MM-DD')}
            </Modal>
        </div>
        }
        {isError && <ErrorStatus500
            open={isErrorModalOpen}
        />}
    </>
    );
};

export default CalendarPage;