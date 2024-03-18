import { FormProps } from "antd";


export type DrawerFormType = FormProps & {
    closeDrawer: boolean;
    setCloseDrawer: () => void;
};