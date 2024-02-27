import { GooglePlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Image, Tabs, Grid } from "antd";
import { Link, Navigate, useLocation } from "react-router-dom";
import FullLogoIcon from "/icons/full-logo-icon.svg";
import { useCheckEmailMutation, useLoginMutation } from "@services/auth-service";
import { useEffect, useState } from "react";
import { ROUTER_PATHS as Paths } from "../../../routes/index";
import { IAuthForm } from "@interfaces/auth.interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/configure-store";
import { push } from "redux-first-history";
import { authActions } from "@redux/auth.slice";
import { useForm } from "antd/lib/form/Form";
import { appActions } from "@redux/app.slice";



export const LoginForm = () => {
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const [login, { isLoading: isLoginLoading, isSuccess: isLoginSuccess, isError: isLoginError, data }] = useLoginMutation();
    const [checkEmail, { isSuccess: isCheckSuccess, isError: isCheckError, error }] = useCheckEmailMutation();
    const [emailInput, setEmailInput] = useState<string>('');
    const confirmEmail = useSelector((s: RootState) => s.auth.confirmEmail);
    const history = useSelector((s: RootState) => s.router);
    const { pathname } = useLocation();
    const [form] = useForm();
    const dispatch = useDispatch<AppDispatch>();
    const onFinish = async (values: IAuthForm) => {
        if (values.email && values.password)
            await login({
                email: values.email,
                password: values.password
            });
        return;
    };
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailRegex.test(email)
    };
    const forgotPasswordHandler = async () => {
        if (validateEmail(emailInput)) {
            dispatch(authActions.setConfirmEmail(emailInput));
            await checkEmail({ email: emailInput });
        }
        return
    };

    useEffect(() => {
        dispatch(appActions.setIsLoading(isLoginLoading));
    }, [isLoginLoading, dispatch]);
    useEffect(() => {
        if (history.location?.state instanceof Object &&
            'from' in history.location.state &&
            history.location.state.from === Paths.Result.PasswordRecovery.CheckEmail.Error
            && confirmEmail)
            checkEmail({ email: confirmEmail });
    }, [checkEmail, confirmEmail, history.location?.state]);

    useEffect(() => {
        if (isCheckSuccess) {
            dispatch(push(Paths.Auth.ConfirmEmail, {
                from: pathname
            }));
        }
        if (isCheckError && error) {
            if ('status' in error) {
                const errData = 'error' in error ? error.error : JSON.parse(JSON.stringify(error.data));
                if (error.status === 404 && errData.message === 'Email не найден')
                    dispatch(push(Paths.Result.PasswordRecovery.CheckEmail.ExistError, { from: pathname }));
                else
                    dispatch(push(Paths.Result.PasswordRecovery.CheckEmail.Error, { from: pathname }));

            }
        }
        return
    }, [isCheckError, isCheckSuccess, dispatch, pathname, error]);

    useEffect(() => {
        if (isLoginSuccess && data) {
            if (form.getFieldValue('remember')) {
                localStorage.setItem('access_token', data.accessToken);
            }
            else {
                dispatch(authActions.setAccessToken(data.accessToken))
            }
            dispatch(push(Paths.Main, { from: pathname }));
        }
        if (isLoginError)
            dispatch(push(Paths.Result.Login.Error, { from: pathname }));
    }, [isLoginSuccess, isLoginError, dispatch, data, form, pathname]);


    return (<>
        <Image
            style={{
                margin: "16px 9px",
            }}
            width={(screens?.xs) ? 203 : 309}
            preview={false}
            src={FullLogoIcon}
            alt="Logo"
        />
        <Tabs
            defaultActiveKey="1"
            tabBarGutter={0}
            items={[
                {
                    label: <Link to={'/auth/login'}>Вход</Link>,
                    key: '1',
                    children: <Form
                        form={form}
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: (screens?.xs) ? "auto" : '368px'
                        }}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: '',
                                },
                                {
                                    required: true,
                                    message: '',
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                data-test-id='login-email'
                                addonBefore='e-mail:'
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)} />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{
                                required: true,
                                message: (<span style={{ fontSize: '12px' }}>Пароль не менее 8 символов, с заглавной буквой и цифрой</span>)
                            },
                            {
                                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
                                message: (<span style={{ fontSize: '12px' }}>Пароль не менее 8 символов, с заглавной буквой и цифрой</span>)
                            },
                            ]}
                        >
                            <Input.Password
                                data-test-id='login-password'
                                size="large"
                                placeholder="Пароль" />
                        </Form.Item>

                        <Form.Item style={{ paddingTop: '54px' }}>
                            <div style={{ float: 'left' }}>
                                <Form.Item name="remember" valuePropName="checked" noStyle  >
                                    <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                                </Form.Item>
                            </div>


                            <Button
                                onClick={forgotPasswordHandler}
                                type="link"
                                data-test-id='login-forgot-button'
                                className="login-form-forgot"
                                style={{ padding: '0px', height: 'auto', float: 'right' }}
                            >Забыли пароль?</Button>

                        </Form.Item>

                        <Form.Item>
                            <Button
                                data-test-id='login-submit-button'
                                size="large"
                                type="primary"
                                htmlType="submit"
                                style={{ width: '100%' }}>
                                Войти
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Button size="large" type="default" htmlType="submit" style={{ width: '100%' }}>
                                <GooglePlusOutlined />
                                <span>Войти через Google</span>
                            </Button>
                        </Form.Item>
                    </Form>
                },
                {
                    label: <Link to={'/auth/registration'}>Регистрация</Link>,
                    key: '2',
                    children: <Navigate to={Paths.Auth.Registration} />
                },
            ]}
        /></>);

};
