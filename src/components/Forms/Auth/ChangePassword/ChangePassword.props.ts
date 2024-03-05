import { IAuthResultProps } from "@components/Results/AuthResult/AuthResult.props";


export type IChangePassword = Omit<IAuthResultProps, 'buttonTitle'> 