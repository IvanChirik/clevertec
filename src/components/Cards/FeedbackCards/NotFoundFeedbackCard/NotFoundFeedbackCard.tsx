import { Card, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import { FC } from "react";


export const NotFoundFeedbackCard: FC = () => {
    const { Text } = Typography

    return <Card
        bodyStyle={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
        <Title level={3}>Оставьте свой отзыв первым</Title>
        <Text style={{
            maxWidth: '50%',
            textAlign: 'center'
        }} type="secondary">Вы можете быть первым, кто оставит отзыв
            об этом фитнесс приложении. Поделитесь своим мнением и опытом с
            другими пользователями, и помогите им сделать правильный выбор.</Text>
    </Card>
};