import { Grid, Result } from "antd";
import { FC, useEffect, useState } from "react";
import VerificationInput from "react-verification-input";
import styles from './ConfirmEmail.module.scss';
import { useConfirmEmailMutation } from "@services/auth-service";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/configure-store";
import { push } from "redux-first-history";
import { ROUTER_PATHS as Paths } from "@routes/route-paths";
import { authActions } from "@redux/auth.slice";
import { useCheckPathname } from "@hooks/use-check-pathname";
import { IConfirmEmailProps } from "./ConfirmEmail.props";
import { useLocation } from "react-router-dom";
import { appActions } from "@redux/app.slice";




export const ConfirmEmail: FC<IConfirmEmailProps> = ({ pathFrom }) => {
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint()
    const [confirmEmail, { isLoading, isSuccess, isError }] = useConfirmEmailMutation();
    const email = useSelector((s: RootState) => s.auth.confirmEmail);
    const { pathname } = useLocation();
    const [verificationCode, setVerificationCode] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();
    useCheckPathname(pathFrom);
    useEffect(() => {
        dispatch(appActions.setIsLoading(isLoading));
    }, [isLoading]);
    useEffect(() => {
        if (isSuccess) {
            dispatch(push(Paths.Auth.ChangePassword, { from: pathname }));
            dispatch(authActions.setConfirmEmail(''))
        }
    }, [isSuccess])
    useEffect(() => {
        if (verificationCode.length === 6) {
            if (email) {
                confirmEmail({ email, code: verificationCode });
            }
            setVerificationCode('');
        }
    }, [verificationCode])

    return <Result
        style={{
            maxWidth: "539px",
            width: "calc(100% - 16px)",
            margin: "16px",
            padding: screens.xs ? "32px 16px" : "64px 0",
            zIndex: 1,
            backgroundColor: "white"
        }}

        status={isError ? "error" : "info"}

        title={isError ?
            <span>Неверный код. Введите код для восстановления аккаунта</span>
            :
            <span style={{ lineHeight: "32px", fontWeight: 500, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span>Введите код</span>
                <span>для восстановления аккаунта</span>
            </span>
        }
        subTitle={
            <>
                <span>Мы отправили на e-mail {email} </span>
                <br />
                <span>шестизначный код.Введите его в поле ниже.</span>
            </>
        }
        extra={
            <div data-test-id='verification-input' style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <VerificationInput
                    data-test-id='verification-input'
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e)}
                    classNames={{
                        character: isError ? styles.characterError : styles.character,
                        characterInactive: styles['character--inactive']
                    }}
                />
                <span style={{
                    color: "#8C8C8C"
                }}>Не пришло письмо? Проверьте папку Спам.</span>
            </div>

        }
    />
};