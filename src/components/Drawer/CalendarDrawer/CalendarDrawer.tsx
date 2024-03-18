import { ChangeEvent, FC, useState } from "react";
import { CalendarDrawerType } from "./CalendarDrawer.props";
import { Badge, Button, Card, Drawer, Grid, Row } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CalendarInputBlock } from "@components/Input/CalendarInputBlock/CalendarInputBlock";
import { BlockContent } from "@components/Input/CalendarInputBlock/CalendarInputBlock.props";
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { trainingActions } from "@redux/training.slice";
import { colorTraining } from "@src/types/training.types";
import { DrawerForm } from "@components/Forms/Calendar/DrawerForm";


const { useBreakpoint } = Grid;

const CalendarDrawer: FC<CalendarDrawerType> = ({ open, onClose }) => {
    const { exercises } = useAppSelector(s => s.training.selectedDate)
    const screens = useBreakpoint();
    const selectedData = useAppSelector(s => s.training.selectedDate);
    const dispatch = useAppDispatch();
    const { isExerciseEdit } = useAppSelector(s => s.training)
    const [exerciseBlocks, setExerciseBlocks] = useState<BlockContent[]>(exercises);
    const addExerciseBlock = () => {
        const newBlock = { name: '', approaches: 0, weight: 0, replays: 0 };
        setExerciseBlocks([...exerciseBlocks, newBlock]);
    };
    const handleCloseDrawer = (e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => {
        const filledBlocks = exerciseBlocks.filter(block => block.name.trim().length);

        dispatch(trainingActions.setSelectedExercises(filledBlocks));
        onClose?.(e);
    }
    const handleExerciseChange = (e: ChangeEvent<HTMLInputElement>, index: number, rowType: keyof BlockContent) => {
        setExerciseBlocks(exerciseBlocks.map((exercise, i) => {
            if (i === index) {
                return {
                    ...exercise,
                    [rowType]: rowType === 'name' ? e.target.value : +e.target.value
                }
            }
            else
                return exercise
        }));
    };

    return <Drawer
        mask={false}
        title={isExerciseEdit ? <>< EditOutlined /> Редактирование</> : <><PlusOutlined />Добавление упражнений</>}
        placement={screens.xs ? 'bottom' : 'right'}
        onClose={(e) => handleCloseDrawer(e)}
        open={open}>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '25px'
        }}>
            <Row
                justify={'space-between'}>
                <Badge color={colorTraining[`${selectedData?.trainingType!}`]} text={selectedData?.trainingType} />
                <span>{selectedData?.date?.format('DD.MM.YYYY')}</span>
            </Row> <div
                style={{
                    maxHeight: '85dvh',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    overflowX: 'unset',
                    overflowY: 'scroll'
                }}>
                <DrawerForm />
                {/* {exerciseBlocks.map((block, index) => <CalendarInputBlock
                        key={Math.random() * 10}
                        index={index}
                        handleChange={handleExerciseChange}
                        blockContent={block} />)} */}
            </div>
        </div>
    </Drawer>
};

export default CalendarDrawer;
