export interface ILoginResponse {
    accessToken: string;
}

export interface ICheckEmailResponse {
    email: string;
    message: string;
}


export interface IAuthForm {
    email: string;
    password: string;
}