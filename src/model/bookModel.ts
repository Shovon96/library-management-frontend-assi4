import z from "zod/v3";

export interface IBook {
    _id: string;
    title: string;
    author: string;
    genre: string;
    isbn: string;
    copies: number;
    description?: string;
    available: boolean;
    createdAt?: string;
    updatedAt?: string;
}


//  Zod Schema form validation for default data
export const bookZodSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    genre: z.string().min(1, "Genre is required"),
    isbn: z.string().min(1, "ISBN is required"),
    description: z.string().optional(),
    copies: z.coerce.number().min(1, "Minimum 1 copy required"),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
});