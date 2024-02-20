import { API_URL } from '@config/API'
import { ICheckEmailResponse, ILoginResponse } from '@interfaces/auth.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IAuthData {
    email: string;
    password: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, IAuthData>({
            query: (authData) => ({
                url: '/auth/login',
                method: 'POST',
                body: authData
            }),
            transformResponse: (response: { data: ILoginResponse }) => response.data,
            transformErrorResponse: (response: { status: string | number }) => response
        }),

        registration: builder.mutation<unknown, IAuthData>({
            query: (authData) => ({
                url: '/auth/registration',
                method: 'POST',
                body: authData
            }),
            transformErrorResponse: (response: { status: string | number }) => response
        }),

        checkEmail: builder.mutation<unknown, Omit<ICheckEmailResponse, 'password'>>({
            query: (authData) => ({
                url: '/auth/check-email',
                method: 'POST',
                body: authData
            }),
        }),

        confirmEmail: builder.mutation<ICheckEmailResponse, Omit<IAuthData, 'message'> & { code: string }>({
            query: (authData) => ({
                url: '/auth/confirm-email',
                method: 'POST',
                body: authData
            }),
        }),

        changePassword: builder.mutation<Omit<ICheckEmailResponse, 'email'>, {
            password: string;
            confirmPassword: string;
        }>({
            query: (authData) => ({
                url: '/auth/change-password',
                method: 'POST',
                body: authData
            }),
        }),
    }),
})


export const {
    useLoginMutation,
    useRegistrationMutation,
    useCheckEmailMutation,
    useChangePasswordMutation,
    useConfirmEmailMutation
} = authApi