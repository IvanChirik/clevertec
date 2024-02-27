import { HeartFilled, IdcardTwoTone } from "@ant-design/icons"
import { Card, Button, Image } from "antd"
import { Content } from "antd/lib/layout/layout"
import React from "react";
import CalenderIcon from "/icons/content-calendar.svg";
import { useSelector } from "react-redux";
import { RootState } from "@redux/configure-store";
import useWindowWidth from "@hooks/use-window-width";


export const MainContent: React.FC = () => {
  const collapsed = useSelector((state: RootState) => state.app.collapsed);
  const width = useWindowWidth()
  return (
    <Content style={{ overflow: 'initial' }}>
      <div
        style={{
          position: "relative",
          maxWidth: "800px",
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: "24px"
        }}
      >
        <Card style={{
          color: "#061178",
          fontSize: "16px",
          lineHeight: "20.8px"
        }}>
          C CleverFit ты сможешь:<br />
          — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;<br />
          — отслеживать свои достижения в разделе статистики, сравнивая свои результаты c нормами и рекордами;<br />
          — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы o тренировках;<br />
          — выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.
        </Card>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          <Card style={{
            fontSize: "20px",
            lineHeight: "26px",
            fontWeight: 500,
          }}>
            <p>{"CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!"}</p>
          </Card>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px"
            }}
          >
            <Card
              style={{
                flex: 1
              }}
              size='small'
              title={<span >Расписать{(!collapsed && width < 834 && width > 360) ? <br /> : ' '}тренировки</span>}
              headStyle={{
                wordWrap: "break-word", display: "flex", alignItems: "center",
                justifyContent: `${(!collapsed && width < 834 && width > 360) ? 'start' : 'center'}`,
                padding: `${(!collapsed && width < 834 && width > 360) ? '25px' : '0px'}`, height: "45px"
              }}
              bodyStyle={{ textAlign: "center", height: "56px", padding: "12px" }}
              bordered={false} >
              <Button type='link'>
                <HeartFilled />
                Тренировки
              </Button>
            </Card>
            <Card
              style={{
                flex: 1
              }}
              size='small'
              title={<span >Назначить{(!collapsed && width < 834 && width > 360) ? <br /> : ' '}календарь</span>}
              headStyle={{
                wordWrap: "break-word", display: "flex", alignItems: "center",
                justifyContent: `${(!collapsed && width < 834 && width > 360) ? 'start' : 'center'}`,
                padding: `${(!collapsed && width < 834 && width > 360) ? '25px' : '0px'}`,
                height: "45px",
              }}
              bodyStyle={{ textAlign: "center", height: "56px", padding: "12px" }}
              bordered={false} >
              <Button type='link'>
                <Image src={CalenderIcon} alt='Calendar' style={{
                  paddingRight: '10px'
                }} />
                Календарь
              </Button>
            </Card>
            <Card
              style={{
                flex: 1
              }}
              size='small'
              title={<span >Заполнить{(!collapsed && width < 834 && width > 360) ? <br /> : ' '}профиль</span>}
              headStyle={{
                wordWrap: "break-word", display: "flex", alignItems: "center",
                justifyContent: `${(!collapsed && width < 834 && width > 360) ? 'start' : 'center'}`,
                padding: `${(!collapsed && width < 834 && width > 360) ? '25px' : '0px'}`,
                height: "45px"
              }}
              bodyStyle={{ textAlign: "center", height: "56px", padding: "12px" }}
              bordered={false} >
              <Button type='link'>
                <IdcardTwoTone />
                Профиль
              </Button>
            </Card>
          </div>
        </div>

      </div>
    </Content >
  )
}