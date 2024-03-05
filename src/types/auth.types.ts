export type ILoginResponse = {
    accessToken: string;
}

export type ICheckEmailResponse = {
    email: string;
    message: string;
}


export type IAuthForm = {
    email: string;
    password: string;
}