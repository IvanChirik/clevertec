import { FC } from "react";
import { CalendarDrawerType } from "./CalendarDrawer.props";
import { Card, Col, Drawer, Input, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";


const CalendarDrawer: FC<CalendarDrawerType> = ({ open, onClose }) => {
    return <Drawer
        mask={false}
        title={<><PlusOutlined /> Добавление упражнений</>}
        placement="right"
        onClose={onClose}
        open={open}>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
        }}>
            <Input size="small" placeholder="Упражнение" />
            <div>
                <Row gutter={8}>
                    <Col
                        span={8}
                        style={{
                            marginRight: '13px'
                        }}>
                        <Card
                            bodyStyle={{
                                padding: '0px 0px 0px 10px',
                                backgroundColor: ' #f0f0f0',
                                height: '24px'
                            }} >
                            Подходы
                        </Card>
                    </Col>
                    <Col span={7}>
                        <Card
                            bodyStyle={{
                                padding: '0px 0px 0px 10px',
                                backgroundColor: ' #f0f0f0',
                                height: '24px'
                            }} >
                            Вес, кг
                        </Card>
                    </Col>
                    <Col span={7}>
                        <Card
                            bodyStyle={{
                                padding: '0px',
                                textAlign: 'center',
                                backgroundColor: ' #f0f0f0',
                                height: '24px'
                            }} >
                            Количество
                        </Card>
                    </Col>
                </Row>
            </div>
            <Input.Group size="small">
                <Row gutter={8}>
                    <Col
                        span={10}
                        style={{
                            marginRight: '13px'
                        }}>
                        <Input
                            placeholder="1"
                            addonBefore={<PlusOutlined style={{
                                width: '10px'
                            }} />} />
                    </Col>
                    <Col span={8}>
                        <Input placeholder="0" />
                    </Col>
                    <Col span={5}>
                        <Input placeholder="3" />
                    </Col>
                </Row>
            </Input.Group>
        </div>

    </Drawer>
};

export default CalendarDrawer;