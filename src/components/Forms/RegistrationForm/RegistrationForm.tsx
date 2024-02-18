import { Button, Checkbox, Form, Input } from "antd";


export const RegistrationForm = () => {
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
            <Input size="large" addonBefore={'email:'} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
            name="password2"
            rules={[{ required: true, message: 'Please input your password2!' }]}
            extra="Пароль не менее 8 символов, с заглавной буквой и цифрой"
        >
            <Input.Password size="large" placeholder="Пароль" />
        </Form.Item>
        <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
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
                Регистрация через Google
            </Button>
        </Form.Item>
    </Form>
};
