import { IAuthResultProps } from "@components/Results/AuthResult/AuthResult.props";


export interface IChangePassword extends Omit<IAuthResultProps, 'buttonTitle'> {
}