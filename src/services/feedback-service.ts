import { API_URL } from '@config/API'
import { IFeedbackResponseData } from '../types/feedback.types';
import { RootState } from '@redux/configure-store';
import { feedbackActions } from '@redux/feedback.slice.';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


type IFeedbackData = {
    rating: number;
    message: string;
}
export const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
    keepUnusedDataFor: 60,
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
    tagTypes: ['Feedbacks'],
    endpoints: (builder) => ({
        getReviews: builder.query<IFeedbackResponseData[], void>({
            query: () => {
                return {
                    url: '/feedback',
                    credentials: 'include'
                }
            },
            providesTags: ['Feedbacks'],
            transformResponse: (response: IFeedbackResponseData[]) => response?.reverse() || [],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(feedbackActions.setFeedbacks(data));
                } catch (error) { }
            },
        }),

        createReview: builder.mutation<{}, IFeedbackData>({
            query: (reviewData: IFeedbackData) => ({
                url: '/feedback',
                method: 'POST',
                body: reviewData
            }),
            invalidatesTags: ['Feedbacks'],
        }),


    }),
})


export const {
    useGetReviewsQuery,
    useCreateReviewMutation,
} = feedbackApi;
