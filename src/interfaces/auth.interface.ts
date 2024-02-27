

export interface ILoginResponse {
    accessToken: string;
}

export interface ICheckEmailResponse {
    email: string;
    message: string;
}

export interface IErrorDataResponse {
    error: string;
    message: string;
    statusCode: number;
}

export interface IAuthErrorResponse {
    data: IErrorDataResponse;
    status: number;
}

export interface IAuthForm {
    email: string;
    password: string;
}