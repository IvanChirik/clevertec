import { Card, Grid, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import { FC } from "react";


export const NotFoundFeedbackCard: FC = () => {
    const { Text } = Typography;
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();


    return <Card
        bodyStyle={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '56px 24px'
        }}>
        <Title style={{
            textAlign: 'center',
            color: '#061178',
            margin: '0px'
        }} level={3}>Оставьте свой отзыв первым</Title>
        <Text style={{
            maxWidth: `${screens.xs ? '100%' : '50%'}`,
            textAlign: 'center',
            marginTop: '48px'
        }} type="secondary">Вы можете быть первым, кто оставит отзыв
            об этом фитнесс приложении. Поделитесь своим мнением и опытом с
            другими пользователями, и помогите им сделать правильный выбор.</Text>
    </Card>
};