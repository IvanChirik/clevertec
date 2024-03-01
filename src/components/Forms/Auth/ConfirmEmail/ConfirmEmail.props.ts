import { IAuthResultProps } from "@components/Results/AuthResult/AuthResult.props";


export interface IConfirmEmailProps extends Omit<IAuthResultProps, 'buttonTitle'> {
}