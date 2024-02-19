import { Button, Result } from "antd";
import { FC } from "react";
import { IAuthResultProps } from "./AuthResult.props";



export const AuthResult: FC<IAuthResultProps> = (props) => {
    const {
        status,
        buttonTitle,
        title,
        subTitle
    } = props;
    return <Result
        style={{
            padding: '0px'
        }}
        status={status}
        title={title}
        subTitle={subTitle}
        extra={[
            <Button
                style={{ width: "100%" }}
                size="large" type="primary" key="console">
                {buttonTitle}
            </Button>
        ]}
    />

};

