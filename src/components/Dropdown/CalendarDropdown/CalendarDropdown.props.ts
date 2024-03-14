import { DropdownProps } from "antd";


export type CalendarDropdownType = DropdownProps & {
    closeCategoryModal: () => void;
}