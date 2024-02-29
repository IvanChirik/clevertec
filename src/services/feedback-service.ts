import { API_URL } from '@config/API'
import { IFeedbackResponseData } from '@interfaces/feedback.interface';
import { RootState } from '@redux/configure-store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IFeedbackData {
    rating: number;
    message: string;
}

export const reviewApi = createApi({
    reducerPath: 'feedbackApi',
    tagTypes: ['Feedback'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            headers.set('Set-Cookie', 'myCookie=myValue; SameSite=None; Secure');
            const token = localStorage.getItem('access_token') || (getState() as RootState).auth.accessToken;
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
        credentials: 'include',
        mode: 'cors'
    }),
    endpoints: (builder) => ({
        getReviews: builder.query<IFeedbackResponseData[], void>({
            query: () => ({
                url: '/feedback',
                providesTags: (result: IFeedbackResponseData[]) =>
                    result
                        ? [
                            ...result.map(({ id }) => ({ type: 'Feedback' as const, id })),
                            { type: 'Feedback', id: 'LIST' },
                        ]
                        : [{ type: 'Feedback', id: 'LIST' }],
            }),
            transformResponse: (response: IFeedbackResponseData[]) => response,
            transformErrorResponse: (response: { status: string | number }) => response
        }),

        createReview: builder.mutation<Record<string, unknown>, IFeedbackData>({
            query: (reviewData: IFeedbackData) => ({
                url: '/feedback',
                method: 'POST',
                body: reviewData
            }),
            invalidatesTags: [{ type: 'Feedback', id: 'LIST' }],
            transformErrorResponse: (response: { status: string | number }) => response
        }),


    }),
})


export const {
    useGetReviewsQuery,
    useCreateReviewMutation,
} = reviewApi;