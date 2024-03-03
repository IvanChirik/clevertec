import { FeedbackCard, NotFoundFeedbackCard } from "@components/Cards/FeedbackCards";
import { NewFeedbackModal } from "@components/ModalWindows/FeedbackModal";
import { useModalWindow } from "@hooks/use-modal-windows";

import { useGetReviewsQuery } from "@services/feedback-service";
import { Button, Grid } from "antd";
import { Header } from "antd/lib/layout/layout";
import { FC } from "react";


const FeedbackPage: FC = () => {
    const { isModalOpen, showModal, handleCancel } = useModalWindow();
    const { data } = useGetReviewsQuery(true);
    console.log(data);
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    return <div style={{
        height: '100dvh'
    }}>
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
            >Главная / Отзывы пользователей</div></Header>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: `${data?.length === 0 ? 'center' : 'start'}`,
            padding: '24px',
            gap: '20px',

        }}>
            {data?.length !== 0 &&
                <>
                    {data?.slice(data.length - 5, data.length - 1).map(review => <FeedbackCard
                        key={review.id}
                        reviewData={review} />)}
                    <div style={{
                        marginTop: '150px',
                        display: 'flex',
                        flexDirection: `${screens.xs ? 'column' : 'row'}`,
                        gap: '8px'
                    }}>
                        <Button
                            onClick={showModal}
                            type="primary">Написать отзыв</Button>
                        <Button
                            type="link">Развернуть все отзывы</Button>
                    </div>
                </>
            }
            {data?.length === 0 && <>
                <NotFoundFeedbackCard />
                <Button
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
    </div>
};

export default FeedbackPage;