import { FC, useState } from "react";
import { CalendarDrawerType } from "./CalendarDrawer.props";
import { Badge, Drawer, Grid, Row } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useAppSelector } from "@hooks/typed-react-redux-hooks";
import { colorTraining } from "@src/types/training.types";
import { DrawerForm } from "@components/Forms/Calendar/DrawerForm";


const { useBreakpoint } = Grid;

const CalendarDrawer: FC<CalendarDrawerType> = ({ open, onClose }) => {
    const screens = useBreakpoint();
    const selectedData = useAppSelector(s => s.training.selectedDate);
    const { isExerciseEdit } = useAppSelector(s => s.training)
    const [closeDrawer, setCloseDrawer] = useState(false);
    const handleCloseDrawer = (e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => {
        setCloseDrawer(true);
        onClose?.(e);
    }
    // const handleExerciseChange = (e: ChangeEvent<HTMLInputElement>, index: number, rowType: keyof BlockContent) => {
    //     setExerciseBlocks(exerciseBlocks.map((exercise, i) => {
    //         if (i === index) {
    //             return {
    //                 ...exercise,
    //                 [rowType]: rowType === 'name' ? e.target.value : +e.target.value
    //             }
    //         }
    //         else
    //             return exercise
    //     }));
    // };

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
                <DrawerForm closeDrawer={closeDrawer} setCloseDrawer={() => setCloseDrawer(false)} />
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
