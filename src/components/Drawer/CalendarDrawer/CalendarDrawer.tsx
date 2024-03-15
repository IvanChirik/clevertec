import { ChangeEvent, FC, useState } from "react";
import { CalendarDrawerType } from "./CalendarDrawer.props";
import { Button, Card, Drawer, Grid, Input, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CalendarInputBlock } from "@components/Input/CalendarInputBlock/CalendarInputBlock";
import { BlockContent } from "@components/Input/CalendarInputBlock/CalendarInputBlock.props";
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { trainingActions } from "@redux/training.slice";

const initialExerciseState = [{
    name: '',
    approaches: '',
    weight: '',
    replays: ''
}];
const { useBreakpoint } = Grid;

const CalendarDrawer: FC<CalendarDrawerType> = ({ open, onClose }) => {
    const screens = useBreakpoint();
    const selectedData = useAppSelector(s => s.training.selectedDate);
    const dispatch = useAppDispatch();
    const [exerciseBlocks, setExerciseBlocks] = useState<BlockContent[]>(initialExerciseState);
    const addExerciseBlock = () => {
        const newBlock = { name: '', approaches: '', weight: '', replays: '' };
        setExerciseBlocks([...exerciseBlocks, newBlock]);
    };
    console.log(exerciseBlocks.map(i => i.name))
    const handleCloseDrawer = (e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => {
        const filledBlocks = exerciseBlocks.filter(block => block.name.trim().length);
        s('');
        setExerciseBlocks(initialExerciseState);
        dispatch(trainingActions.setSelectedExercises(filledBlocks));
        onClose?.(e);
    }
    const handleExerciseChange = (e: ChangeEvent<HTMLInputElement>, index: number, rowType: keyof BlockContent) => {
        const newBlocks = [...exerciseBlocks];

        newBlocks[index][rowType] = e.target.value;
        setExerciseBlocks(newBlocks);
        console.log(newBlocks)
    };
    const [i, s] = useState<string>();

    return <Drawer
        mask={false}
        title={<><PlusOutlined /> Добавление упражнений</>}
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
                <span>{selectedData?.trainingType}</span>
                <span>{selectedData?.date?.format('DD.MM.YYYY')}</span>
            </Row>
            <div
                style={{
                    maxHeight: '80dvh',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    overflowX: 'hidden',
                    overflowY: 'scroll'
                }}>
                {exerciseBlocks.map((block, index) => <CalendarInputBlock
                    key={Math.random() * 10}
                    index={index}
                    handleChange={handleExerciseChange}
                    blockContent={block} />)}
            </div>
            <div
                style={{
                    maxHeight: '80dvh',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    overflowX: 'hidden',
                    overflowY: 'scroll'
                }}>
                <Input size="small" value={i} onChange={(e) => s(e.target.value)} />
            </div>
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
                    onClick={addExerciseBlock}
                    type="link">
                    <PlusOutlined /> Добавить ещё
                </Button>
            </Card>
        </div>

    </Drawer>
};

export default CalendarDrawer;
