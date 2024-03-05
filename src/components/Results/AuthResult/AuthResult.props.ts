import { ResultProps } from "antd";



export type IAuthResultProps = ResultProps & {
    buttonTitle: string;
    pathFrom: string;
    pathTo?: string;
    dataTest?: string;
}