import { AndroidFilled, AppleFilled } from "@ant-design/icons"
import { ErrorStatus500 } from "@components/ModalWindows/FeedbackModal";
import { useAppDispatch } from "@hooks/typed-react-redux-hooks";
import { useModalWindow } from "@hooks/use-modal-windows";
import { IErrorResponse } from "@interfaces/response-error.interface";
import { appActions } from "@redux/app.slice";
import { authActions } from "@redux/auth.slice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Paths } from "@routes/index";
import { useGetReviewsQuery } from "@services/feedback-service";
import { Button, Card, Grid } from "antd"
import { Footer } from "antd/lib/layout/layout"
import { useEffect, useState } from "react";
import { push } from "redux-first-history";


type CustomError = FetchBaseQueryError & IErrorResponse

export const MainFooter: React.FC = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const dispatch = useAppDispatch();
  const { isModalOpen, showModal, handleCancel } = useModalWindow();
  const [reviewButtonClicked, setReviewButtonClicked] = useState<boolean>(false);
  const {
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetReviewsQuery(reviewButtonClicked);

  const getFeedback = () => {
    setReviewButtonClicked(true);
  }
  useEffect(() => {
    dispatch(appActions.setIsLoading(isLoading));
  }, [isLoading, dispatch]);
  useEffect(() => {
    if (isSuccess)
      dispatch(push(Paths.Feedbacks));
    if (isError && error) {
      const customError = error as CustomError;

      if (customError.data.statusCode === 403) {
        localStorage.removeItem('access_token');
        dispatch(authActions.setAccessToken(''))
        dispatch(push(Paths.Auth.Login));
        return
      }
      if (customError.data.statusCode !== 403)
        showModal()
    }
  }, [isSuccess, isError, dispatch])



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
        onClick={getFeedback}
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
      <ErrorStatus500
        open={isModalOpen}
        onCancel={handleCancel} />
    </Footer>
  )
}