import { GooglePlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tabs, Image, Grid } from "antd";
import { Link, Navigate, useLocation } from "react-router-dom";
import FullLogoIcon from "/icons/full-logo-icon.svg";
import { Paths } from "../../../../routes";
import { useRegistrationMutation } from "@services/auth-service";
import { useEffect, useState } from "react";
import { IAuthForm } from "../../../../types/auth.types";
import { push } from "redux-first-history";
import { authActions } from "@redux/auth.slice";
import { appActions } from "@redux/app.slice";
import { useForm } from "antd/lib/form/Form";
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
const { useBreakpoint } = Grid;



export const RegistrationForm = () => {
    const screens = useBreakpoint();
    const [registration, { isLoading, isSuccess, isError, error }] = useRegistrationMutation();
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const [form] = useForm();
    const [passwordInput, setPasswordInput] = useState<string>('');
    const history = useAppSelector(s => s.router);
    const previousRegistrationData = useAppSelector(s => s.auth.registrationData);
    const passwordValidator = (password: string) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password)
    }
    const onFinish = async (values: IAuthForm) => {
        if (values.email && values.password) {
            await registration({
                email: values.email,
                password: values.password
            });
            dispatch(authActions.setRegistrationData({
                email: values.email,
                password: values.password
            }))
        }

    };
    useEffect(() => {
        dispatch(appActions.setIsLoading(isLoading));
    }, [isLoading, dispatch])
    useEffect(() => {
        if (history.location?.state instanceof Object &&
            'from' in history.location.state &&
            history.location.state.from === Paths.Result.Registration.Error
            && previousRegistrationData)
            registration(previousRegistrationData);
    }, [registration, previousRegistrationData, history.location?.state]);
    useEffect(() => {
        if (isSuccess) {
            dispatch(push(Paths.Result.Registration.Success, { from: pathname }));
            dispatch(authActions.setRegistrationData({ email: '', password: '' }));
        }
        else if (isError && error && 'status' in error && error.status === 409)
            dispatch(push(Paths.Result.Registration.UserExistError, { from: pathname }));
        else if (isError) {
            dispatch(push(Paths.Result.Registration.Error, { from: pathname }))
        }
    }, [isSuccess, isError, dispatch, error, pathname])

    return (
        <>
            <Image
                style={{ margin: "16px 9px" }}
                width={(screens?.xs) ? 203 : 309}
                preview={false}
                src={FullLogoIcon}
                alt="Logo"
            />
            <Tabs
                defaultActiveKey='2'
                tabBarGutter={0}
                items={[
                    {
                        label: <Link to={'/auth/login'}><span style={{ color: '#262626' }}>Вход</span></Link>,
                        key: '1',
                        children: <Navigate to={Paths.Auth.Login} />
                    },
                    {
                        label: <Link to={'/auth/registration'}>Регистрация</Link>,
                        key: '2',
                        children: <Form
                            form={form}
                            name="registration"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            style={{ minWidth: (screens?.xs) ? "auto" : '368px' }}
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
                                    data-test-id='registration-email'
                                    size="large"
                                    addonBefore='e-mail:' />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                style={{ fontSize: '12px' }}
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
                                extra={passwordValidator(passwordInput) ?
                                    <span style={{ fontSize: '12px' }}>Пароль не менее 8 символов, с заглавной буквой и цифрой</span> :
                                    ' '}
                            >
                                <Input.Password
                                    data-test-id='registration-password'
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                    value={passwordInput}
                                    size="large"
                                    placeholder="Пароль" />
                            </Form.Item>
                            <Form.Item
                                name="confirm"

                                rules={[
                                    {
                                        required: true,
                                        message: ''
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
                                    data-test-id='registration-confirm-password'
                                    size="large"
                                    placeholder="Повторите пароль" />
                            </Form.Item>


                            <Form.Item style={{ paddingTop: '32px' }}>
                                <Button
                                    data-test-id='registration-submit-button'
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
                                    <span>Регистрация через Google</span>
                                </Button>
                            </Form.Item>
                        </Form>
                    },
                ]}
            />
        </>
    );
};

