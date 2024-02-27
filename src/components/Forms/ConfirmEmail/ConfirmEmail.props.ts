import { IAuthResultProps } from "@components/AuthResult/AuthResult.props";


export interface IConfirmEmailProps extends Omit<IAuthResultProps, 'buttonTitle'> {
}