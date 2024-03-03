import { Card, Grid, Image, Rate, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import { FC } from "react";
import { IFeedbackCardProps } from "./FeedbackCard.props";
import { formatDate } from "@helpers/dataFormater";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";


export const FeedbackCard: FC<IFeedbackCardProps> = ({ reviewData }) => {
    const {
        imageSrc,
        rating,
        fullName: responseName,
        message,
        createdAt
    } = reviewData;
    const name = responseName ? (<>{responseName?.split(' ')[0]}<br />{responseName?.split(' ')[1]}</>) : 'Пользователь';
    const { Text } = Typography;
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    return <Card
        bodyStyle={{
            display: 'flex',
            flexDirection: `${screens.xs ? 'column' : 'row'}`,
            gap: '12px'
        }}>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            minWidth: '174px',
            alignItems: 'center',
            textAlign: 'center'
        }}>
            {imageSrc ?
                <Image
                    style={{
                        borderRadius: '50px'
                    }}
                    width={42}
                    height={42}
                    src={imageSrc ? imageSrc : 'error'}
                /> :
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        width: '42px',
                        backgroundColor: '#f5f5f5',
                        height: '42px'
                    }}>
                    <UserOutlined />
                </div>}
            <Title
                style={{
                    margin: '0px'
                }}
                level={5} >{name}</Title>
        </div>
        <div>
            <div
                style={{
                    marginBottom: '16px'
                }}>
                <Rate value={rating} />
                <Text style={{
                    marginLeft: '16px',
                }} type="secondary">{formatDate(createdAt)}</Text>
            </div>
            <Text type="secondary">{message}</Text>
        </div>
    </Card>
};
