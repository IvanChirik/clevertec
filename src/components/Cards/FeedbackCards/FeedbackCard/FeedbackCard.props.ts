import { IFeedbackResponseData } from "../../../../types/feedback.types";
import { CardProps } from "antd";


export type IFeedbackCardProps = CardProps & {
    reviewData: IFeedbackResponseData
}