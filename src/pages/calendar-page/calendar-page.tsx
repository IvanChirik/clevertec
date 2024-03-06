import { FC } from 'react';
import { CalendarHeader } from './';
import { Loader } from '@components/UI/Loader/Loader';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Calendar, ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/zh_TW'





const CalendarPage: FC = () => {
    const { isLoading } = useAppSelector(s => s.app);


    return (<>
        {isLoading && <Loader />}
        <CalendarHeader />
        <div style={{
            padding: '0px 24px 24px 24px',
            backgroundColor: "#F0F5FF"
        }}>
            <ConfigProvider locale={enUS}>
                <Calendar />
            </ConfigProvider>
        </div>
    </>
    );
};

export default CalendarPage;