import { IAuthResultProps } from "@components/Results/AuthResult/AuthResult.props";


export type IConfirmEmailProps = Omit<IAuthResultProps, 'buttonTitle'> 