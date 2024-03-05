import React, { Suspense } from 'react';
import { Grid, Layout } from 'antd';
import main_background from "/images/main_background.png"
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';
import { RequireAuth } from '@helpers/RequireAuth';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
const { useBreakpoint } = Grid;


const MainLayout: React.FC = () => {
    const { collapsed, isLoading } = useAppSelector(s => s.app);
    const screens = useBreakpoint();
    const layoutPaddingLeft = (screens?.xs) ? '0' : (collapsed ? '64px' : '208px');

    return <RequireAuth>
        <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative" }}>
            <Layout style={{ position: "relative" }}>
                <Sidebar />
                <Layout style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: "padding-left 0.146s linear",
                    paddingLeft: layoutPaddingLeft,
                    minHeight: "100dvh",
                    backgroundPosition: "center",
                    backgroundImage: `url(${main_background})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}>
                    <Suspense fallback={isLoading}><Outlet /></Suspense>
                </Layout>
            </Layout >
        </div>
    </RequireAuth>
};

export default MainLayout;
