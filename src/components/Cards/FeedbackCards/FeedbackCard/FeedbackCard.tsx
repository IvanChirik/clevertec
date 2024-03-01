import { Card, Image, Rate, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import { FC } from "react";


export const FeedbackCard: FC = () => {
    const { Text } = Typography;

    return <Card
        bodyStyle={{
            display: 'flex',
            flexDirection: 'row'
        }}>
        <div>
            <Image
                style={{
                    borderRadius: '50px'
                }}
                width={42}
                height={42}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <Title level={4} >Вероника Иванова</Title>
        </div>
        <div>
            <div>
                <Rate />
                <Text type="secondary">20.10.2023</Text>
            </div>
            <Text type="secondary">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, harum. Ab aut ipsum, fugiat, quam placeat sit quo in harum officiis, doloribus voluptatem consequuntur magni esse incidunt? Eligendi, quas! Qui.</Text>
        </div>
    </Card>
};
