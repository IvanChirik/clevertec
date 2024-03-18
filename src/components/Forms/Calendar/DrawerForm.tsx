import { FC, useEffect } from 'react';
import { DrawerFormType } from './DrawerForm.props';
import { Button, Card, Form, Input, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

const initialExerciseState = {
    name: '',
};

export const DrawerForm: FC<DrawerFormType> = () => {
    const [form] = Form.useForm();
    const { exercises } = useAppSelector(s => s.training.selectedDate);
    useEffect(() => {
        if (exercises.length)
            form.setFieldsValue({
                exercises: [...exercises || initialExerciseState]
            });
        else
            form.setFieldsValue({
                exercises: [initialExerciseState]
            });
    }, []);
    const handleSubmit = () => {
        form.submit();
    }
    useEffect(() => {
        console.log(form.getFieldsValue());
    }, form.getFieldsValue())

    return <Form form={form} name="dynamic_form_nest_item" autoComplete="off">
        <Form.List name="exercises">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <div key={key} style={{ display: 'flex', flexDirection: 'column' }} >
                            <div style={{
                                width: '100%'
                            }}>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'name']}
                                >
                                    <Input size='small' placeholder="Упражнение" />
                                </Form.Item>
                            </div>
                            <div key={key} style={{ display: 'flex' }}>
                                <div
                                    style={{
                                        marginRight: '10px',
                                    }}
                                >  <Card
                                    bodyStyle={{
                                        padding: '0px 0px 0px 10px',
                                        backgroundColor: ' #f0f0f0',
                                        height: '24px',
                                        marginBottom: '10px'
                                    }} >
                                        Подходы
                                    </Card> <Form.Item
                                        {...restField}
                                        name={[name, 'approaches']}
                                    >

                                        <InputNumber
                                            addonBefore={<PlusOutlined />}
                                            size='small'
                                            placeholder="1" />
                                    </Form.Item></div>

                                <div
                                    style={{
                                        marginRight: '10px',
                                    }}
                                > <Card
                                    bodyStyle={{
                                        padding: '0px 0px 0px 10px',
                                        backgroundColor: ' #f0f0f0',
                                        height: '24px',
                                        marginBottom: '10px'
                                    }} >
                                        Вес, кг
                                    </Card><Form.Item
                                        {...restField}
                                        name={[name, 'weight']}
                                    >
                                        <InputNumber size='small' placeholder="0" />
                                    </Form.Item></div>
                                <div> <Card
                                    bodyStyle={{
                                        padding: '0px',
                                        textAlign: 'center',
                                        backgroundColor: ' #f0f0f0',
                                        height: '24px',
                                        marginBottom: '10px'
                                    }} >
                                    Количество
                                </Card><Form.Item
                                    {...restField}
                                    name={[name, 'replays']}
                                >

                                        <InputNumber size='small' placeholder="3" />
                                    </Form.Item></div>
                            </div>
                        </div>
                    ))}
                    <Form.Item>
                        <Card
                            bodyStyle={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '24px 0px',
                                backgroundColor: ' #f0f0f0',
                                height: '24px'
                            }} >
                            <Button
                                style={{
                                    width: '100%',
                                    textAlign: 'left'
                                }}
                                onClick={() => add()}
                                type="link">
                                <PlusOutlined /> Добавить ещё
                            </Button>
                        </Card>
                    </Form.Item>
                </>
            )}
        </Form.List>
    </Form >
};

