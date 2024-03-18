import { FC, useEffect } from 'react';
import { DrawerFormType } from './DrawerForm.props';
import { Button, Card, Checkbox, Form, Input, InputNumber } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingActions } from '@redux/training.slice';
import { BlockContent } from '@components/Input/CalendarInputBlock/CalendarInputBlock.props';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

type FormField = {
    exercises: BlockContent[];
}
const initialExerciseState = {
    name: '',
}


export const DrawerForm: FC<DrawerFormType> = ({ setCloseDrawer, closeDrawer }) => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm<FormField>();
    const { exercises } = useAppSelector(s => s.training.selectedDate);
    const { isExerciseEdit } = useAppSelector(s => s.training)
    const handleChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };
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
    useEffect(() => {
        if (closeDrawer) {
            const filledBlocks = form.getFieldsValue().exercises.filter(block => block.name.trim().length);
            dispatch(trainingActions.setSelectedExercises(filledBlocks));
        }
    }, [closeDrawer])

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
                                    <Input addonAfter={isExerciseEdit && <Form.Item><Checkbox onChange={handleChange} /></Form.Item>
                                    } size='small' placeholder="Упражнение" />
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
                                            min={1}
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
                                        <InputNumber min={0} size='small' placeholder="0" />
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
                                        <InputNumber min={1} size='small' placeholder="3" />
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
                            {isExerciseEdit && <Button
                                disabled
                                type="link"
                                style={{
                                    color: '#262626'
                                }}
                            >
                                <MinusOutlined />Удалить
                            </Button>}
                        </Card>
                    </Form.Item>
                </>
            )}
        </Form.List>
    </Form >
};

