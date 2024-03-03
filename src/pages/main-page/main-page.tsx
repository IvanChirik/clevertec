import React from 'react';
import { MainContent, MainFooter, MainHeader } from './';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configure-store';
import { Loader } from '@components/UI/Loader/Loader';



const MainPage: React.FC = () => {
    const { isLoading } = useSelector((state: RootState) => state.app);


    return (<>
        {isLoading && <Loader />}
        <MainHeader />
        <MainContent />
        <MainFooter />
    </>
    );
};

export default MainPage;