import { Result } from "antd";
import { FC, useEffect, useState } from "react";
import VerificationInput from "react-verification-input";
import styles from './ConfirmEmail.module.scss';
import { useConfirmEmailMutation } from "@services/auth-service";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/configure-store";
import { push } from "redux-first-history";
import { ROUTER_PATHS as Paths } from "@routes/route-paths";
import { authActions } from "@redux/auth.slice";
import cn from 'classnames';
import { useCheckPathname } from "@hooks/use-check-pathname";
import { IConfirmEmailProps } from "./ConfirmEmail.props";
import { useLocation } from "react-router-dom";
import { appActions } from "@redux/app.slice";




export const ConfirmEmail: FC<IConfirmEmailProps> = ({ pathFrom }) => {
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
            padding: '0px'
        }}
        title={isError ?
            <span>Неверный код. Введите код для восстановления аккаунта</span> :
            <span>Введите код для восстановления аккаунта</span>}
        subTitle={`Мы отправили вам на e-mail ${email} шестизначный код. Введите его в поле ниже`}
        extra={[
            <div className={styles['input-wrapper']}>
                <VerificationInput
                    data-test-id='verification-input'
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e)}
                    classNames={{
                        character: isError ? cn(styles.character, styles.error) : styles.character,
                        characterInactive: styles['character--inactive']
                    }} />
                <span>Не пришло письмо? Проверьте папку Спам.</span>
            </div>
        ]}
    />
};

