import { GooglePlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Image, Tabs } from "antd";
import { Link, Navigate, useLocation } from "react-router-dom";
import FullLogoIcon from "/icons/full-logo-icon.svg";
import { useCheckEmailMutation, useLoginMutation } from "@services/auth-service";
import { useEffect, useState } from "react";
import { ROUTER_PATHS as Paths } from "../../../routes/index";
import { IAuthForm } from "@interfaces/auth.interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/configure-store";
import { push } from "redux-first-history";
import { authActions } from "@redux/auth.slice";



export const LoginForm = () => {
    const [login, { isSuccess: isLoginSuccess, isError: isLoginError }] = useLoginMutation();
    const [checkEmail, { isSuccess: isCheckSuccess, isError: isCheckError, error }] = useCheckEmailMutation();
    const [emailInput, setEmailInput] = useState<string>('');
    const { pathname } = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const onFinish = async (values: IAuthForm) => {
        if (values.email && values.password)
            await login({
                email: values.email,
                password: values.password
            });
        return;
    };
    const forgotPasswordHandler = async () => {
        await checkEmail({ email: emailInput });
        return
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailRegex.test(email)
    };
    useEffect(() => {
        if (isCheckSuccess) {
            dispatch(authActions.setConfirmEmail(emailInput));
            dispatch(push(Paths.Auth.ConfirmEmail, {
                from: pathname
            }));
        }
        if (isCheckError && error) {
            if ('status' in error) {
                const errData = 'error' in error ? error.error : JSON.parse(JSON.stringify(error.data));
                if (error.status === 404 && errData.message === 'Email не найден')
                    dispatch(push(Paths.Result.PasswordRecovery.CheckEmail.ExistError));
                else
                    dispatch(push(Paths.Result.PasswordRecovery.CheckEmail.Error))
            }
        }
        return
    }, [isCheckError, isCheckSuccess]);

    useEffect(() => {
        if (isLoginSuccess)
            dispatch(push(Paths.Main));
        if (isLoginError)
            dispatch(push(Paths.Result.Login.Error));
    }, [isLoginSuccess, isLoginError]);


    return (<> <Image
        style={{
            margin: "16px 9px",
            justifySelf: 'center'
        }}
        width={309}
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
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
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
                            <Input size="large" addonBefore='email:'
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)} />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '' }]}
                        >
                            <Input.Password size="large" placeholder="Пароль" />
                        </Form.Item>

                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Запомнить меня</Checkbox>
                            </Form.Item>

                            <Button
                                onClick={forgotPasswordHandler}
                                type="link"
                                className="login-form-forgot"
                                style={{ float: 'right', padding: '0px', height: 'auto' }}
                                disabled={!validateEmail(emailInput)}
                            >Забыли пароль?</Button>

                        </Form.Item>

                        <Form.Item>
                            <Button size="large" type="primary" htmlType="submit" style={{ width: '100%' }}>
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
