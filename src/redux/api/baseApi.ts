import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://library-management-liard-six.vercel.app/api'
        // baseUrl: 'http://localhost:5000/api'
    }),
    tagTypes: ['book'],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: ({ sortBy, sort, page = 1, limit = 10 }) => {
                const params = new URLSearchParams();
                if (sortBy) params.append("sortBy", sortBy);
                if (sort) params.append("sort", sort);
                params.append("page", String(page));
                params.append("limit", String(limit));

                return `/books?${params.toString()}`;
            },
            providesTags: ['book']
        }),
        createBook: builder.mutation({
            query: (bookData) => ({
                url: '/books',
                method: 'POST',
                body: bookData
            }),
            invalidatesTags: ['book']
        })
    }),
})

export const { useGetBooksQuery, useCreateBookMutation } = baseApi