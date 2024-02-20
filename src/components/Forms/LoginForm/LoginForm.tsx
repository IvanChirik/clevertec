import { GooglePlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Image, Tabs } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import FullLogoIcon from "/icons/full-logo-icon.svg";
import { ROUTER_PATHS } from "../../../routes/index";
import { useLoginMutation } from "@services/auth-service";
import { useEffect } from "react";
import { ROUTER_PATHS as Paths } from "../../../routes/index";
import { IAuthForm } from "@interfaces/auth.interface";


export const LoginForm = () => {
    const [loginPost, { isSuccess, isError }] = useLoginMutation();
    const navigate = useNavigate();
    const onFinish = async (values: IAuthForm) => {
        console.log(values);
        if (values.email && values.password)
            await loginPost({
                email: values.email,
                password: values.password
            });
        return;
    };
    useEffect(() => {
        if (isSuccess)
            navigate(Paths.Main);
        if (isError) {
            navigate(Paths.Result.Login.Error);
        }
    }, [isSuccess, isError]);


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
                                    message: 'P',
                                },
                            ]}
                        >
                            <Input size="large" addonBefore='email:' />
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

                            <a className="login-form-forgot" href="" style={{ float: 'right' }}>
                                Забыли пароль?
                            </a>
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
                    children: <Navigate to={ROUTER_PATHS.Auth.Registration} />
                },
            ]}
        /></>);

};
