export const AUTH_PATH = '/auth';
export const RESULT_PATH = '/result'


export const ROUTER_PATHS = {
    Main: '/main',
    Feedbacks: '/feedbacks',
    Auth: {
        Login: `${AUTH_PATH}/login`,
        Registration: `${AUTH_PATH}/registration`,
        ConfirmEmail: `${AUTH_PATH}/confirm-email`,
        ChangePassword: `${AUTH_PATH}/change-password`
    },
    Result: {
        Registration: {
            Success: `${RESULT_PATH}/success`,
            UserExistError: `${RESULT_PATH}/error-user-exist`,
            Error: `${RESULT_PATH}/error`
        },
        Login: {
            Error: `${RESULT_PATH}/error-login`
        },
        PasswordRecovery: {
            CheckEmail: {
                ExistError: `${RESULT_PATH}/error-check-email-no-exist`,
                Error: `${RESULT_PATH}/error-check-email`
            },
            CheckPassword: {
                Success: `${RESULT_PATH}/success-change-password`,
                Error: `${RESULT_PATH}/error-change-password`
            }
        }
    }
};