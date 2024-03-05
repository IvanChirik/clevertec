import { ROUTER_PATHS as Paths } from "@routes/route-paths";
import { useChangePasswordMutation } from "@services/auth-service";
import { Button, Form, Input } from "antd";
import Title from "antd/lib/typography/Title";
import { FC, useEffect, useState } from "react";
import { push } from "redux-first-history";
import { IChangePassword } from "./ChangePassword.props";
import { useLocation } from "react-router-dom";
import { authActions } from "@redux/auth.slice";
import { useCheckPathname } from "@hooks/use-check-pathname";
import { appActions } from "@redux/app.slice";
import { useForm } from "antd/lib/form/Form";
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";



export const ChangePassword: FC<IChangePassword> = ({ pathFrom }) => {
    const [changePassword, { isLoading, isSuccess, isError, error }] = useChangePasswordMutation();
    const dispatch = useAppDispatch();
    const [form] = useForm();
    const [passwordInput, setPasswordInput] = useState<string>('');
    const previousPassword = useAppSelector(s => s.auth.changePasswordData);
    const history = useAppSelector(s => s.router);
    const { pathname } = useLocation();
    const passwordValidator = (password: string) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password)
    }
    const setNewPassword = async (values: { password: string }) => {
        dispatch(authActions.setChangePasswordData(values.password));
        await changePassword({ password: values.password, confirmPassword: values.password });
    };
    useCheckPathname(pathFrom, Paths.Result.PasswordRecovery.CheckPassword.Error);
    useEffect(() => {
        dispatch(appActions.setIsLoading(isLoading));
    }, [isLoading, dispatch]);
    useEffect(() => {
        if (history.location?.state instanceof Object &&
            'from' in history.location.state &&
            (history.location.state.from === Paths.Auth.ChangePassword || Paths.Result.PasswordRecovery.CheckPassword.Error)
            && previousPassword)
            changePassword({ password: previousPassword, confirmPassword: previousPassword });
    }, [changePassword, previousPassword, history.location?.state]);
    useEffect(() => {
        if (isSuccess) {
            dispatch(push(Paths.Result.PasswordRecovery.CheckPassword.Success, { from: pathname }));
            dispatch(authActions.setChangePasswordData(''));
        }

        if (isError && error) {
            if ('status' in error) {
                const errData = 'error' in error ? error.error : JSON.parse(JSON.stringify(error.data));
                console.log(errData);
            }
            dispatch(push(Paths.Result.PasswordRecovery.CheckPassword.Error, { from: pathname }));
        }
    }, [isSuccess, isError, dispatch, error, pathname])


    return <Form
        form={form}
        name="confirm-password"
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={setNewPassword}
        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
    >
        <Title style={{ textAlign: 'center' }} level={2} >Восстановление аккаунта</Title>
        <Form.Item
            name="password"
            rules={[
                {
                    required: true,
                    message: (<span style={{ fontSize: '12px' }}>Пароль не менее 8 символов, с заглавной буквой и цифрой</span>)
                },
                {
                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
                    message: (<span style={{ fontSize: '12px' }}>Пароль не менее 8 символов, с заглавной буквой и цифрой</span>)
                },
            ]}
            extra={passwordValidator(passwordInput) || !form.isFieldTouched('password') ?
                <span style={{ fontSize: '12px' }}>Пароль не менее 8 символов, с заглавной буквой и цифрой</span> :
                ' '}
        >
            <Input.Password
                onChange={(e) => setPasswordInput(e.target.value)}
                value={passwordInput}
                size="large"
                data-test-id='change-password'
                placeholder="Новый пароль" />
        </Form.Item>
        <Form.Item
            name="confirm"
            rules={[
                {
                    required: true,
                    message: '',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Пароли не совпадают'));
                    },
                }),

            ]}
        >
            <Input.Password
                data-test-id='change-confirm-password'
                onChange={(e) => setPasswordInput(e.target.value)}
                value={passwordInput}
                size="large"
                placeholder="Повторите пароль" />
        </Form.Item>
        <Form.Item>
            <Button
                data-test-id='change-submit-button'
                size="large"
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}>
                Сохранить
            </Button>
        </Form.Item>
    </Form>
};
