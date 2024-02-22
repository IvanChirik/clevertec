import { AppDispatch } from "@redux/configure-store";
import { ROUTER_PATHS as Paths } from "@routes/route-paths";
import { useChangePasswordMutation } from "@services/auth-service";
import { Button, Form, Input } from "antd";
import Title from "antd/lib/typography/Title";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { push } from "redux-first-history";


export const ChangePassword: FC = () => {
    const [changePassword, { isSuccess, isError, error }] = useChangePasswordMutation();
    const dispatch = useDispatch<AppDispatch>();
    const setNewPassword = async (values: { password: string }) => {
        console.log({ password: values.password, confirmPassword: values.password });
        await changePassword({ password: values.password, confirmPassword: values.password });
    };
    useEffect(() => {
        if (isSuccess)
            dispatch(push(Paths.Result.PasswordRecovery.CheckPassword.Success));
        if (isError) {
            if ('status' in error!) {
                const errData = 'error' in error ? error.error : JSON.parse(JSON.stringify(error.data));
                console.log(errData);
            }
            dispatch(push(Paths.Result.PasswordRecovery.CheckPassword.Error));
        }
    }, [isSuccess, isError])


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
                    pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                    message: ''
                },
            ]}
            extra="Пароль не менее 8 символов, с заглавной буквой и цифрой"
        >
            <Input.Password size="large" placeholder="Новый пароль" />
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
            <Input.Password size="large" placeholder="Повторите пароль" />
        </Form.Item>
        <Form.Item>
            <Button size="large" type="primary" htmlType="submit" style={{ width: '100%' }}>
                Сохранить
            </Button>
        </Form.Item>
    </Form>
};
