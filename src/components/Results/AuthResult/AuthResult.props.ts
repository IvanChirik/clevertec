import { ResultProps } from "antd";



export interface IAuthResultProps extends ResultProps {
    buttonTitle: string;
    pathFrom: string;
    pathTo?: string;
    dataTest?: string;
}