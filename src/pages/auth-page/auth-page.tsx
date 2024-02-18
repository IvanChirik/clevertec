import { Card, Layout, Image, Tabs } from "antd";
import { FC } from "react";
import auth_background from '../../../public/images/auth_background.png';
import styles from './auth-page.module.scss';
import FullLogoIcon from "/icons/full-logo-icon.svg";
import { Link, Outlet } from "react-router-dom";




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
                    height: '742px'
                }}>
                <Image
                    style={{ margin: "16px 9px" }}
                    width={309}
                    preview={false}
                    src={FullLogoIcon}
                    alt="Logo"
                />
                <Tabs tabBarGutter={0} defaultActiveKey="1" >
                    <Tabs.TabPane tab={<Link to={'/auth/login'}>Вход</Link>} key="1">
                        <Outlet />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={<Link to={'/auth/registration'}>Регистрация</Link>} key="2">
                        <Outlet />
                    </Tabs.TabPane>
                </Tabs>


            </Card>
        </Layout></div>
};

