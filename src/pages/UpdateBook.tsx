import { useNavigate, useParams } from "react-router-dom";
import { useGetBookQuery } from "@/redux/api/baseApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateBookMutation } from "@/redux/api/baseApi";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/layoutComponents/Loader";
import { bookZodSchema, type IBook } from "@/model/bookModel";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EditBookForm() {
    const { id } = useParams<{ id: string }>();
    const { data: book, isLoading: loadingBook } = useGetBookQuery(id!, { refetchOnMountOrArgChange: true, refetchOnReconnect: true });
    const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
    const navigate = useNavigate()

    // const { id } = useParams<"id">();
    // const { data: book } = useGetBookQuery(id!)

    const form = useForm<Partial<IBook>>({
        resolver: zodResolver(bookZodSchema.partial()),
        defaultValues: {
            title: book?.data?.title,
            author: book?.data?.author,
            isbn: book?.data?.isbn,
            genre: book?.data?.genre,
            copies: book?.data?.copies,
            description: book?.data?.description,
        },
    });

    if (loadingBook) return <Loader />;
    if (!book) return <p>Book not found!</p>;

    const onSubmit = async (data: Partial<IBook>) => {
        try {
            await updateBook({ id: id!, bookData: data }).unwrap();
            toast.success('Book Successfully Updated')
            navigate(-1);
        } catch (error) {
            toast.error('Update Request Failed!')
            console.error("Update failed:", error);
        }
    };

    return (
        <>
            <h1 className="text-2xl font-bold my-5 text-center">Update <span className="text-blue-600">{book?.data?.title}</span> Book</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto p-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Title" {...field} defaultValue={book?.data?.title} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Author</FormLabel>
                                <FormControl>
                                    <Input placeholder="Author" {...field} defaultValue={book?.data?.author} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="isbn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ISBN</FormLabel>
                                <FormControl>
                                    <Input placeholder="ISBN" {...field} defaultValue={book?.data?.isbn} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="genre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Genre</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={book?.data?.genre}
                                    >
                                        <SelectTrigger className="w-auto">
                                            <SelectValue placeholder="Choose genre" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {["FICTION", "NON_FICTION", "HISTORY", "SCIENCE", "BIOGRAPHY", "FANTASY"].map((g) => (
                                                <SelectItem key={g} value={g}>
                                                    {g}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="copies"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Copies</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Copies" {...field} defaultValue={book?.data?.copies} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Description" {...field} defaultValue={book?.data?.description} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isUpdating} className="w-full bg-blue-500 cursor-pointer">
                        {isUpdating ? "Saving..." : "Update Book"}
                    </Button>
                </form>
            </Form>
        </>
    );
}