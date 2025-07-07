import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

interface BorrowPayload {
    bookId: string;
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
    tagTypes: ['book'],
    endpoints: (builder) => ({
        // Borrow Book POST
        borrowBook: builder.mutation<{ message: string }, BorrowPayload>({
            query: (data) => ({
                url: "borrow",
                method: "POST",
                body: data,
            }),
            // invalidatesTags: ["book", "borrow"],
        }),
    })
})