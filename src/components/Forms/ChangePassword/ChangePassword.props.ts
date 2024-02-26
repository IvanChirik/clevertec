import { IAuthResultProps } from "@components/AuthResult/AuthResult.props";


export interface IChangePassword extends Omit<IAuthResultProps, 'buttonTitle'> {
}