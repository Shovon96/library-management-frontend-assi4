import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


interface BorrowPayload {
    book: string;
    quantity: number;
    dueDate: string;
}

interface BorrowSummary {
    title: string;
    isbn: string;
    totalQuantity: number;
}

export const borrowApi = createApi({
    reducerPath: 'borrowApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://library-management-liard-six.vercel.app/api'
        // baseUrl: 'http://localhost:5000/api'
    }),
    tagTypes: ['book', 'borrow'],
    endpoints: (builder) => ({
        // Borrow Book POST request
        borrowBook: builder.mutation<{ message: string }, BorrowPayload>({
            query: (data) => ({
                url: "/borrow",
                method: "POST",
                body: {
                    book: data.book,
                    quantity: data.quantity,
                    dueDate: data.dueDate,
                },
            }),
            invalidatesTags: ['book', 'borrow'],
        }),
    }),
});

export const { useBorrowBookMutation } = borrowApi