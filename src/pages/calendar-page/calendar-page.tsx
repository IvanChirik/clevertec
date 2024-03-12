import { FC } from 'react';
import { CalendarHeader } from './';
import { Loader } from '@components/UI/Loader/Loader';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Calendar, ConfigProvider } from 'antd';





const CalendarPage: FC = () => {
    const { isLoading } = useAppSelector(s => s.app);


    return (<>
        {isLoading && <Loader />}
        <CalendarHeader />
        <div style={{
            padding: '0px 24px 24px 24px',
            backgroundColor: "#F0F5FF"
        }}>
            <ConfigProvider >
                <Calendar />
            </ConfigProvider>
        </div>
    </>
    );
};

export default CalendarPage;