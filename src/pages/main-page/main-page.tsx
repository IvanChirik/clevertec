import React from 'react';
import { MainContent, MainFooter, MainHeader } from './';
import { Loader } from '@components/UI/Loader/Loader';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';



const MainPage: React.FC = () => {
    const { isLoading } = useAppSelector(s => s.app);


    return (<>
        {isLoading && <Loader />}
        <MainHeader />
        <MainContent />
        <MainFooter />
    </>
    );
};

export default MainPage;