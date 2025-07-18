import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://library-management-liard-six.vercel.app/api'
        // baseUrl: 'http://localhost:5000/api'
    }),
    tagTypes: ['book', 'borrow'],
    endpoints: (builder) => ({
        // Get All books
        getBooks: builder.query({
            query: ({ sortBy, sort, page = 1, limit = 10 }) => {
                const params = new URLSearchParams();
                if (sortBy) params.append("sortBy", sortBy);
                if (sort) params.append("sort", sort);
                params.append("page", String(page));
                params.append("limit", String(limit));

                return `/books?${params.toString()}`;
            },
            providesTags: ['book', 'borrow']
        }),
        // Create New book query request
        createBook: builder.mutation({
            query: (bookData) => ({
                url: '/books',
                method: 'POST',
                body: bookData
            }),
            invalidatesTags: ['book', 'borrow']
        }),
        // Get Specific book
        getBook: builder.query({
            query: (id) => `/books/${id}`,
            providesTags: (id) => [{ type: "book", id }, 'borrow'],
        }),
        // Update Specific book query request
        updateBook: builder.mutation({
            query: ({ id, bookData }) => ({
                url: `/books/${id}`,
                method: 'PATCH',
                body: bookData,
            }),
            invalidatesTags: ['book', 'borrow']
        }),
        // Delete Specific book query request
        deleteBook: builder.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `/books/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['book', 'borrow']
        }),
    }),
})

export const {
    useGetBooksQuery,
    useCreateBookMutation,
    useUpdateBookMutation,
    useGetBookQuery,
    useDeleteBookMutation
} = baseApi