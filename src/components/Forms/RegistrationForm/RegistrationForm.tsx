import { GooglePlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tabs, Image } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import FullLogoIcon from "/icons/full-logo-icon.svg";
import { ROUTER_PATHS as Paths } from "../../../routes/index";
import { useRegistrationMutation } from "@services/auth-service";
import { useEffect } from "react";
import { IAuthForm } from "@interfaces/auth.interface";


export const RegistrationForm = () => {
    const [registrationPost, { isSuccess, isError, error }] = useRegistrationMutation();
    const navigate = useNavigate();
    const onFinish = async (values: IAuthForm) => {
        if (values.email && values.password)
            await registrationPost({
                email: values.email,
                password: values.password
            })
    };
    useEffect(() => {
        if (isSuccess) {
            navigate(Paths.Result.Registration.Success);
        }
        else if (isError && error) {
            if ('status' in error && error.status === 409)
                navigate(Paths.Result.Registration.UserExistError);
        }
        else if (isError) {
            navigate(Paths.Result.Registration.Error)
        }
    }, [isSuccess, isError])

    return (
        <>
            <Image
                style={{ margin: "16px 9px" }}
                width={309}
                preview={false}
                src={FullLogoIcon}
                alt="Logo"
            />
            <Tabs
                defaultActiveKey='2'
                tabBarGutter={0}
                items={[
                    {
                        label: <Link to={'/auth/login'}>Вход</Link>,
                        key: '1',
                        children: <Navigate to={Paths.Auth.Login} />
                    },
                    {
                        label: <Link to={'/auth/registration'}>Регистрация</Link>,
                        key: '2',
                        children: <Form
                            name="registration"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
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
                                <Input size="large" addonBefore='email:' />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: ''
                                    },
                                    {
                                        pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                                        message: ''
                                    },
                                ]}
                                extra="Пароль не менее 8 символов, с заглавной буквой и цифрой"
                            >
                                <Input.Password size="large" placeholder="Пароль" />
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
                                <Input.Password size="large" placeholder="Повторите пароль" />
                            </Form.Item>


                            <Form.Item>
                                <Button size="large" type="primary" htmlType="submit" style={{ width: '100%' }}>
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

