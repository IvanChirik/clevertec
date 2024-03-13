import { API_URL } from '@config/API'
import { RootState } from '@redux/configure-store';
import { trainingActions } from '@redux/training.slice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TrainingData } from '@src/types/training.types';


export const trainingApi = createApi({
    reducerPath: 'trainingApi',
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
    tagTypes: ['Training'],
    endpoints: (builder) => ({
        getTrainingData: builder.query<TrainingData[], void>({
            query: () => {
                return {
                    url: '/training',
                    credentials: 'include'
                }
            },
            providesTags: ['Training'],
            transformResponse: (response: TrainingData[]) => response?.reverse() || [],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(trainingActions.setTraining(data));
            },
        }),

        createTraining: builder.mutation<TrainingData, Omit<TrainingData, 'id' | 'userId'>>({
            query: (body: TrainingData) => ({
                url: '/feedback',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Training'],
        }),
        editTraining: builder.mutation<TrainingData, Omit<TrainingData, 'id' | 'userId'>>({
            query(data: TrainingData) {
                const { _id, ...body } = data
                return {
                    url: `/training/${_id}`,
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: ['Training'],
        }),
        deleteTraining: builder.mutation<Record<string, string>, string>({
            query: (id: string) => ({
                url: `/training/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Training'],
        }),
    }),
})


export const {
    useGetTrainingDataQuery,
    useCreateTrainingMutation,
    useEditTrainingMutation,
    useDeleteTrainingMutation
} = trainingApi;
