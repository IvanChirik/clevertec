import { API_URL } from '@config/API'
import { IFeedbackResponseData } from '@interfaces/feedback.interface';
import { RootState } from '@redux/configure-store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IFeedbackData {
    rating: number;
    message: string;
}

export const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            headers.set('Set-Cookie', 'myCookie=myValue; SameSite=None; Secure');
            const token = localStorage.getItem('access_token') || (getState() as RootState).auth.accessToken;
            console.log(token)
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
        credentials: 'include',
        mode: 'cors'
    }),
    tagTypes: ['Feedback'],
    endpoints: (builder) => ({
        getReviews: builder.query<IFeedbackResponseData[], boolean>({
            query: (clicked) => ({
                url: `${clicked ? '/feedback' : null}`,
                providesTags: (result: IFeedbackResponseData[]) =>
                    result
                        ? [...result.map(({ id }) => ({ type: 'Feedback' as const, id })), 'Feedback']
                        : ['Feedback'],
            }),
            transformResponse: (response: IFeedbackResponseData[]) => response,
            transformErrorResponse: (response: { status: string | number }) => response
        }),

        createReview: builder.mutation<IFeedbackResponseData, IFeedbackData>({
            query: (reviewData: IFeedbackData) => ({
                url: '/feedback',
                method: 'POST',
                body: reviewData
            }),
            invalidatesTags: ['Feedback'],
            transformErrorResponse: (response: { status: string | number }) => response
        }),


    }),
})


export const {
    useGetReviewsQuery,
    useCreateReviewMutation,
} = feedbackApi;