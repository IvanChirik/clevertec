import { AppDispatch, RootState } from "@redux/configure-store";
import { ROUTER_PATHS as Paths } from "@routes/route-paths";
import { useChangePasswordMutation } from "@services/auth-service";
import { Button, Form, Input } from "antd";
import Title from "antd/lib/typography/Title";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "redux-first-history";
import { IChangePassword } from "./ChangePassword.props";
import { useLocation } from "react-router-dom";
import { authActions } from "@redux/auth.slice";
import { useCheckPathname } from "@hooks/use-check-pathname";
import { appActions } from "@redux/app.slice";



export const ChangePassword: FC<IChangePassword> = ({ pathFrom }) => {
    const [changePassword, { isLoading, isSuccess, isError, error }] = useChangePasswordMutation();
    const dispatch = useDispatch<AppDispatch>();
    const previousPassword = useSelector((s: RootState) => s.auth.changePasswordData);
    const history = useSelector((s: RootState) => s.router);
    const { pathname } = useLocation();
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
        name="confirm-password"
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={setNewPassword}
        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
    >
        <Title style={{ textAlign: 'center' }} level={2} >Восстановление пароля</Title>
        <Form.Item
            name="password"
            rules={[
                { required: true, message: '' },
                {
                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
                    message: ''
                },
            ]}
            extra="Пароль не менее 8 символов, с заглавной буквой и цифрой"
        >
            <Input.Password
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
