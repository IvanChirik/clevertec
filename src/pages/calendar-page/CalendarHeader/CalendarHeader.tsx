import { SettingOutlined } from "@ant-design/icons"
import { Button, Grid } from "antd"
import { Header } from "antd/lib/layout/layout"
import { FC } from "react";

const { useBreakpoint } = Grid;

export const CalendarHeader: FC = () => {
    const screens = useBreakpoint();
    return (
        <Header style={{
            height: "fit-content",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#F0F5FF"
        }}>
            <div
                style={{
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "18.2px"
                }}
            >Календарь</div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingTop: "8px",
                }}
            >
                <Button
                    icon={<SettingOutlined />}
                    style={{
                        color: "#262626",
                    }}
                    type="link"
                >
                    {!screens?.xs ? "Настройки" : ''}
                </Button>
            </div>
        </Header>
    )
}