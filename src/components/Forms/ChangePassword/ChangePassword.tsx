import { Button, Form, Input } from "antd";
import Title from "antd/lib/typography/Title";
import { FC } from "react";


export const ChangePassword: FC = () => {
    return <Form
        name="confirm-password"
        initialValues={{ remember: true }}
        autoComplete="off"
        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
    >
        <Title level={2} >Восстановление пароля</Title>
        <Form.Item
            name="confirm-password"
            rules={[{ required: true, message: '' }]}
            extra="Пароль не менее 8 символов, с заглавной буквой и цифрой"
        >
            <Input.Password size="large" placeholder="Новый пароль" />
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
                        if (!value || getFieldValue('confirm-password') === value) {
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
                Сохранить
            </Button>
        </Form.Item>
    </Form>
};
