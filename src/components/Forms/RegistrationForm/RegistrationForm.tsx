import { GooglePlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tabs, Image } from "antd";
import { Link, Navigate } from "react-router-dom";
import FullLogoIcon from "/icons/full-logo-icon.svg";
import { ROUTER_PATHS } from "../../../routes/index";


export interface IRegistrationFormValues {
    ['registration-email']?: string;
    ['registration-password']?: string;
}

export const RegistrationForm = () => {
    const onFinish = (values: IRegistrationFormValues) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

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
                        children: <Navigate to={ROUTER_PATHS.Auth.Login} />
                    },
                    {
                        label: <Link to={'/auth/registration'}>Регистрация</Link>,
                        key: '2',
                        children: <Form
                            name="registration"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                name="registration-email"
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
                                name="registration-password"
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
                                            if (!value || getFieldValue('registration-password') === value) {
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
