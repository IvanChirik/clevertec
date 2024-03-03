export interface IErrorResponseData {
    error: string;
    message: string;
    statusCode: number;
}

export interface IErrorResponse {
    data: IErrorResponseData;
    status: number;
}
