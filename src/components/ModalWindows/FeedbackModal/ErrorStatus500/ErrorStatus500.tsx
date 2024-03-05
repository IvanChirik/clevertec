import { Button, Modal, Result } from "antd";
import { FC } from "react";
import { IErrorStatus500 } from "./ErrorStatus500.props";
import { useAppDispatch } from "@hooks/typed-react-redux-hooks";
import { Paths } from "@routes/index";
import { push } from "redux-first-history";


export const ErrorStatus500: FC<IErrorStatus500> = ({ open }) => {
    const dispatch = useAppDispatch();

    return <Modal
        closable={false}
        centered
        bodyStyle={{
            padding: '0px'
        }}
        open={open}
        footer={[]}><Result
            status="500"
            title="Что-то пошло не так"
            subTitle="Произошла ошибка, попробуйте ещё раз."
            extra={<Button onClick={() => dispatch(push(Paths.Main))} type="primary">Назад</Button>}
        ></Result></Modal>
};