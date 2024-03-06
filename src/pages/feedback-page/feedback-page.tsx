import { FeedbackCard, NotFoundFeedbackCard } from "@components/Cards/FeedbackCards";
import { ErrorStatus500, NewFeedbackModal } from "@components/ModalWindows/FeedbackModal";
import { Loader } from "@components/UI/Loader/Loader";
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { useModalWindow } from "@hooks/use-modal-windows";
import { IErrorResponse, StatusCode } from "@src/types/response-error.types";
import { appActions } from "@redux/app.slice";
import { authActions } from "@redux/auth.slice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Paths } from "@routes/index";
import { useGetReviewsQuery, } from "@services/feedback-service";
import { Button, Grid } from "antd";
import { Header } from "antd/lib/layout/layout";
import { FC, useEffect, useState } from "react";
import { push } from "redux-first-history";


const { useBreakpoint } = Grid;
type CustomError = FetchBaseQueryError & IErrorResponse


const FeedbackPage: FC = () => {
    const { isModalOpen, showModal, handleCancel } = useModalWindow();
    const feedbackData = useAppSelector(s => s.feedback.feedbacks);
    const {
        isModalOpen: isErrorModalOpen,
        showModal: showErrorModal,
        handleCancel: hanleErrorCancel } = useModalWindow();
    const dispatch = useAppDispatch();
    const screens = useBreakpoint();
    const [allFeedbackVisible, setAllFeedbackVisible] = useState(false);
    const sortedData = allFeedbackVisible ? feedbackData?.map(review => <FeedbackCard
        key={review.id}
        reviewData={review} />) :
        feedbackData?.slice(0, 4).map(review => <FeedbackCard
            key={review.id}
            reviewData={review} />);


    const {
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetReviewsQuery();
    useEffect(() => {
        dispatch(appActions.setIsLoading(isLoading));
    }, [isLoading, dispatch]);
    useEffect(() => {
        if (isSuccess)
            dispatch(push(Paths.Feedbacks));
        if (isError && error) {
            const customError = error as CustomError;
            if (customError?.data?.statusCode === StatusCode.Forbidden) {
                localStorage.removeItem('access_token');
                dispatch(authActions.setAccessToken(''))
                dispatch(push(Paths.Auth.Login));
                return
            }
            showErrorModal()
        }
    }, [isSuccess, isError, dispatch]);

    return <div style={{
        height: '100dvh'
    }}>
        {isLoading && <Loader />}
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
            ><span
                onClick={() => dispatch(push(Paths.Main))}
                style={{
                    color: ' #8c8c8c'
                }}>Главная /</span> Отзывы пользователей</div></Header>
        <div style={{
            height: '90%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: `${feedbackData?.length === 0 ? 'center' : 'start'}`,
            padding: `${screens.xs ? '16px' : '24px'}`,
            gap: '20px',

        }}>
            {feedbackData?.length !== 0 && isSuccess &&
                <>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        maxHeight: '80dvh',
                        overflowY: 'scroll'
                    }}>
                        {sortedData}
                    </div>

                    <div style={{
                        marginTop: `${screens.xs ? '48px' : '150px'}`,
                        display: 'flex',
                        flexDirection: `${screens.xs ? 'column' : 'row'}`,
                        gap: '8px'
                    }}>
                        <Button
                            data-test-id='write-review'
                            onClick={showModal}
                            style={{
                                height: '40px'
                            }}
                            type="primary">Написать отзыв</Button>
                        <Button
                            data-test-id='all-reviews-button'
                            onClick={() => setAllFeedbackVisible(prev => !prev)}
                            type="link">{allFeedbackVisible ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}</Button>
                    </div>
                </>
            }
            {feedbackData?.length === 0 && !isLoading && !isError && <>
                <NotFoundFeedbackCard />
                <Button
                    data-test-id='write-review'
                    style={{
                        alignSelf: `${screens.xs ? '' : 'center'}`
                    }}
                    onClick={showModal}
                    type="primary">Написать отзыв</Button>
            </>}
        </div>
        <NewFeedbackModal
            closeHandler={handleCancel}
            open={isModalOpen}
            onCancel={handleCancel} />
        <ErrorStatus500
            open={isErrorModalOpen}
            onCancel={hanleErrorCancel} />
    </div>
};

export default FeedbackPage;