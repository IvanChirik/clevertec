import { API_URL } from '@config/API'
import { catalogsActions } from '@redux/catalogs.slice.';
import { RootState } from '@redux/configure-store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TrainingList } from '@src/types/catalog.types';


export const catalogApi = createApi({
    reducerPath: 'catalogApi',
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
    endpoints: (builder) => ({
        getCatalogTrainingListData: builder.mutation<TrainingList[], void>({
            query: () => {
                return {
                    url: '/catalogs/training-list',
                    method: 'GET',
                    credentials: 'include'
                }
            },
            transformResponse: (response: TrainingList[]) => response || [],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(catalogsActions.setTrainingList(data));
            },
        }),
    })
});


export const {
    useGetCatalogTrainingListDataMutation
} = catalogApi;