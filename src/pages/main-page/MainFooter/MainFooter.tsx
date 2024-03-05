import { AndroidFilled, AppleFilled } from "@ant-design/icons"
import { useAppDispatch } from "@hooks/typed-react-redux-hooks";
import { Paths } from "@routes/index";
import { Button, Card, Grid } from "antd"
import { Footer } from "antd/lib/layout/layout"
import { push } from "redux-first-history";

const { useBreakpoint } = Grid;



export const MainFooter: React.FC = () => {
  const screens = useBreakpoint();
  const dispatch = useAppDispatch();


  return (
    <Footer style={{
      padding: screens?.xs ? "0 24px 42px" : "42px 24px",
      background: "none", display: "flex",

      flexWrap: screens?.xs ? "wrap-reverse" : "wrap",
      gap: screens?.xs ? "20px" : 0,
      alignItems: "flex-end",
      justifyContent: screens?.xs ? "center" : "space-between"
    }}>

      <Button
        data-test-id='see-reviews'
        onClick={() => dispatch(push(Paths.Feedbacks))}
        type='link'>
        Смотреть отзывы
      </Button>
      <Card
        style={{
          width: screens?.xs ? "100%" : "240px"

        }}
        size='small'
        title={
          <div style={{
            boxSizing: "border-box",
            padding: "0",
            display: 'flex',
            gap: "8px",
            flexDirection: "column",
          }}>
            <Button style={{ textAlign: "start", padding: "0 20px", height: "21px", fontSize: "16" }} type='link'>Скачать на телефон</Button>
            <Button style={{ textAlign: "start", padding: "0 20px", height: "18px", fontSize: "16" }} type='link' disabled>Доступно в PRO-тарифе</Button>
          </div>
        }
        headStyle={{ height: "71px", padding: "4px", }}
        bodyStyle={{ textAlign: "center", height: "56px", padding: "12px 0", }}
        bordered={false} >
        <Button style={{ color: "#262626", width: "50%" }} type='link' color='balck'>
          <AndroidFilled />
          Android
        </Button>
        <Button style={{ color: "#262626", width: "50%" }} type='link' color='balck'>
          <AppleFilled />
          IOS
        </Button>
      </Card>
    </Footer>
  )
}