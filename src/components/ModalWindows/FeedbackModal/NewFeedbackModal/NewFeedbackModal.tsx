import { Button, Grid, Modal, Rate } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FC, useEffect, useState } from "react";
import { INewFeedbackModal } from "./NewFeedbackModal.props";
import { useCreateReviewMutation } from "@services/feedback-service";
import { useAppDispatch } from "@hooks/typed-react-redux-hooks";
import { appActions } from "@redux/app.slice";
import { useModalWindow } from "@hooks/use-modal-windows";
import { ErrorModal, SuccessModal } from "..";


export const NewFeedbackModal: FC<INewFeedbackModal> = ({ open, onCancel, closeHandler }) => {
    const [rateValue, setRateValue] = useState<number>(0);
    const [reviewMessage, setReviewMessage] = useState<string>('');
    const { isModalOpen: isErrorOpen, showModal: showErrorModal, handleCancel: closeError } = useModalWindow();
    const { isModalOpen: isSuccessOpen, showModal: showSuccessModal, handleCancel: closeSuccess } = useModalWindow();
    const [createReview, { isLoading, isSuccess, isError }] = useCreateReviewMutation();
    const dispatch = useAppDispatch();
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    const submitReview = async () => {
        await createReview({ rating: rateValue, message: reviewMessage });
        return;
    }
    useEffect(() => {
        if (isSuccess) {
            closeHandler();
            showSuccessModal();
        }
        if (isError) {
            showErrorModal();
        }
    }, [isSuccess, isError]);
    useEffect(() => {
        dispatch(appActions.setIsLoading(isLoading));
    }, [isLoading, dispatch]);


    return <>
        <Modal
            centered
            open={open}
            onCancel={onCancel}
            title="Ваш отзыв"
            style={{ top: 20 }}
            footer={[
                <Button
                    key={'fd'}
                    disabled={rateValue > 0 && rateValue < 6 ? false : true}
                    style={{
                        width: `${screens.xs ? '100%' : 'auto'}`
                    }}
                    onClick={submitReview}
                    type="primary">Опубликовать</Button>,
            ]}
        >
            <Rate
                value={rateValue}
                onChange={setRateValue} />
            <TextArea
                value={reviewMessage}
                onChange={(e) => setReviewMessage(e.target.value)}
                rows={23}
                autoSize
                style={{
                    marginTop: '16px',
                    minHeight: '46px'
                }}
                minLength={2}
                placeholder="Autosize height based on content lines"
            />
        </Modal>
        <SuccessModal
            open={isSuccessOpen}
            onCancel={closeSuccess} />
        <ErrorModal
            closeHandler={closeError}
            open={isErrorOpen}
            closeNewReviewModal={closeHandler} />
    </>
};

