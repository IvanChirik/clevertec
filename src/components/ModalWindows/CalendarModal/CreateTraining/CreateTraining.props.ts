import { ModalProps } from "antd";
import { Moment } from "moment";


export type CreateTrainingType = ModalProps & {
    selectedDate: Moment
};