import { FC, useState } from "react";
import { CalendarDropdownType } from "./CalendarDropdown.props";
import { Dropdown, MenuProps, Space } from "antd";
import { ArrowLeftOutlined, DownOutlined } from "@ant-design/icons";
import { useAppSelector } from "@hooks/typed-react-redux-hooks";


export const CalendarDropdown: FC<CalendarDropdownType> = ({ closeCategoryModal }) => {
    const trainingList = useAppSelector(s => s.catalogs.catalogTrainigList);
    const items: { label: string, key: string }[] = trainingList.map(category => { return { label: category.name, key: category.key } });
    const [changedCategory, setChangedCategory] = useState<string>();
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case 'legs':
                setChangedCategory('Ноги');
                break;
            case 'hands':
                setChangedCategory('Руки');
                break;
            case 'strength':
                setChangedCategory('Силовая');
                break;
            case 'back':
                setChangedCategory('Спина');
                break;
            case 'chest':
                setChangedCategory('Грудь');
                break;
        }
    }

    return (
        <Dropdown
            menu={{
                items,
                onClick: handleMenuClick
            }}
            trigger={['click']}>
            <Space style={{
                width: '100%',
                color: 'black',
                justifyContent: 'space-between'
            }}>
                <div
                    style={{
                        display: 'flex',
                        gap: '10px'
                    }}>
                    <ArrowLeftOutlined
                        onClick={closeCategoryModal} />
                    {changedCategory ? changedCategory : 'Выбор типа тренировки'}
                </div>
                <DownOutlined />
            </Space>
        </Dropdown>
    );
};

