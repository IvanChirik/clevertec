import { ModalProps } from "antd";


export type IErrorModal = ModalProps & { closeNewReviewModal: () => void; closeHandler: () => void };