export const enum StatusCode {
    OK = 200,
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,
    TooManyRequests = 429,
    InternalServerError = 500,
}


export type IErrorResponseData = {
    error: string;
    message: string;
    statusCode: StatusCode;
}

export type IErrorResponse = {
    data: IErrorResponseData;
    status: StatusCode;
}
