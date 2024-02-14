import React from 'react';
import { Grid, Layout } from 'antd';

import main_background from "/images/main_background.png"

import { MainSidebar, MainContent, MainFooter, MainHeader } from '@components/Layout';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configure-store';

export const MainPage: React.FC = () => {
    const collapsed = useSelector((state: RootState) => state.app.collapsed);
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    const layoutPaddingLeft = (screens?.xs) ? '0' : (collapsed ? '64px' : '208px');

    return (
        <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative" }}>
            <Layout style={{ position: "relative" }}>
                <MainSidebar />
                <Layout style={{
                    position: 'relative',
                    transition: "padding-left 0.146s linear",
                    paddingLeft: layoutPaddingLeft,
                    minHeight: "100dvh",
                    backgroundPosition: "center",
                    backgroundImage: `url(${main_background})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",

                }}>
                    <MainHeader />
                    <MainContent />
                    <MainFooter />
                </Layout>
            </Layout >
        </div>
    );
};
