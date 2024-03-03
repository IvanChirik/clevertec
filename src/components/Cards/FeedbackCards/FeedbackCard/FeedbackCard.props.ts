import { IFeedbackResponseData } from "@interfaces/feedback.interface";
import { CardProps } from "antd";


export interface IFeedbackCardProps extends CardProps {
    reviewData: IFeedbackResponseData
}