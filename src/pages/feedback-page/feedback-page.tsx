import { FeedbackCard, NotFoundFeedbackCard } from "@components/Cards/FeedbackCards";
import { NewFeedbackModal } from "@components/ModalWindows/FeedbackModal";
import { useModalWindow } from "@hooks/use-modal-windows";
import { useGetReviewsQuery, } from "@services/feedback-service";
import { Button, Grid } from "antd";
import { Header } from "antd/lib/layout/layout";
import { FC, useState } from "react";


const FeedbackPage: FC = () => {
    const { isModalOpen, showModal, handleCancel } = useModalWindow();
    const { data } = useGetReviewsQuery(true);
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const [allFeedbackVisible, setAllFeedbackVisible] = useState<boolean>(false);
    const sortedData = allFeedbackVisible ? data?.map(review => <FeedbackCard
        key={review.id}
        reviewData={review} />) :
        data?.slice(data.length - 4, data.length).map(review => <FeedbackCard
            key={review.id}
            reviewData={review} />);


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
            ><span
                style={{
                    color: ' #8c8c8c'
                }}>Главная /</span> Отзывы пользователей</div></Header>
        <div style={{
            height: '90%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: `${data?.length === 0 ? 'center' : 'start'}`,
            padding: `${screens.xs ? '16px' : '24px'}`,
            gap: '20px',

        }}>
            {data?.length !== 0 &&
                <>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        maxHeight: '70dvh',
                        overflowY: 'scroll'
                    }}>
                        {sortedData}
                    </div>

                    <div style={{
                        marginTop: `${screens.xs ? '100px' : '150px'}`,
                        display: 'flex',
                        flexDirection: `${screens.xs ? 'column' : 'row'}`,
                        gap: '8px'
                    }}>
                        <Button
                            data-test-id='write-review'
                            onClick={showModal}
                            type="primary">Написать отзыв</Button>
                        <Button
                            data-test-id='all-reviews-button'
                            onClick={() => setAllFeedbackVisible(prev => !prev)}
                            type="link">{allFeedbackVisible ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}</Button>
                    </div>
                </>
            }
            {data?.length === 0 && <>
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
    </div>
};

export default FeedbackPage;