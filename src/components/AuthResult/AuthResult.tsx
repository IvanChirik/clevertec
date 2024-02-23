import { Button, Result } from "antd";
import { FC } from "react";
import { IAuthResultProps } from "./AuthResult.props";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/configure-store";
import { push } from "redux-first-history";
import { useCheckPathname } from "@hooks/use-check-pathname";
import { useLocation } from "react-router-dom";



export const AuthResult: FC<IAuthResultProps> = (props) => {
    const {
        status,
        buttonTitle,
        title,
        subTitle,
        pathFrom,
        pathTo
    } = props;
    const { pathname } = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    useCheckPathname(pathFrom);
    return <Result
        style={{
            padding: '0px'
        }}
        status={status}
        title={title}
        subTitle={subTitle}
        extra={[
            <Button
                onClick={() => dispatch(push(pathTo || pathFrom, { from: pathname }))}
                style={{ width: "100%" }}
                size="large" type="primary" key="console">
                {buttonTitle}
            </Button>
        ]}
    />

};

