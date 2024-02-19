import { Card, Layout } from "antd";
import { FC } from "react";
import auth_background from '/images/auth_background.png';
import styles from './auth-page.module.scss';

import { Outlet } from "react-router-dom";




export const AuthPage: FC = () => {

    return <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative" }}>
        <Layout style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: "100dvh",
            backgroundPosition: "center",
            backgroundImage: `url(${auth_background})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            zIndex: 1
        }}>
            <div className={styles.blur} />
            <Card
                style={{
                    borderRadius: '2px',
                    zIndex: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '48px',
                    padding: '64px 32px',
                    width: '539px',
                }}>
                <Outlet />
            </Card>
        </Layout></div>
};

