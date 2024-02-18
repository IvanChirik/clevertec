import { Button, Checkbox, Form, Input } from "antd";

export const LoginForm = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input size="large" addonBefore={'email:'} />
        </Form.Item>

        <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
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
                Войти через Google
            </Button>
        </Form.Item>
    </Form>
};
