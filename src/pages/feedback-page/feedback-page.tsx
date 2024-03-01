import { FeedbackCard, NotFoundFeedbackCard } from "@components/Cards/FeedbackCards";
import { FC } from "react";


const FeedbackPage: FC = () => {
    return <>
        <FeedbackCard />
        <NotFoundFeedbackCard />
    </>
};

export default FeedbackPage;