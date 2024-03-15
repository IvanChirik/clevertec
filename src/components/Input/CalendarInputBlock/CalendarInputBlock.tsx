import { FC } from "react";
import { CalendarInputBlockType } from "./CalendarInputBlock.props";
import { Card, Col, Input, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";


export const CalendarInputBlock: FC<CalendarInputBlockType> = ({ blockContent, handleChange, index }) => {

    return <>
        <Input value={blockContent.name}
            onChange={(e) => handleChange(e, index, 'name')}
            size="small"
            placeholder="Упражнение" />
        <Input.Group
            size="small">
            <Row
                wrap={false}
                justify={"space-between"}
                gutter={8}>
                <Col
                    span={9}
                    style={{
                        marginRight: '10px',
                    }}>
                    <Card
                        bodyStyle={{
                            padding: '0px 0px 0px 10px',
                            backgroundColor: ' #f0f0f0',
                            height: '24px',
                            marginBottom: '10px'
                        }} >
                        Подходы
                    </Card>
                    <Input
                        value={blockContent.approaches}
                        type="number"
                        onChange={(e) => handleChange(e, index, 'approaches')}
                        placeholder="1"
                        addonBefore={<PlusOutlined style={{
                            width: '10px'
                        }} />} />
                </Col>
                <Col span={7}>
                    <Card
                        bodyStyle={{
                            padding: '0px 0px 0px 10px',
                            backgroundColor: ' #f0f0f0',
                            height: '24px',
                            marginBottom: '10px'
                        }} >
                        Вес, кг
                    </Card>
                    <Input
                        value={blockContent.weight}
                        onChange={(e) => handleChange(e, index, 'weight')}
                        placeholder="0" />
                </Col>
                <Col span={7}>
                    <Card
                        bodyStyle={{
                            padding: '0px',
                            textAlign: 'center',
                            backgroundColor: ' #f0f0f0',
                            height: '24px',
                            marginBottom: '10px'
                        }} >
                        Количество
                    </Card>
                    <Input
                        value={blockContent.replays}
                        onChange={(e) => handleChange(e, index, 'replays')}
                        placeholder="3" />
                </Col>
            </Row>
        </Input.Group>
    </>
};

