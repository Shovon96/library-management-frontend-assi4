// src/components/AddBookForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form, FormField, FormItem, FormLabel,
  FormControl, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { bookZodSchema, type IBook } from "@/model/bookModel";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import type z from "zod/v3";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const previousData: Partial<IBook> = {
  title: "",
  author: "",
  isbn: "",
  copies: 0,
  available: true,
  description: "",
  genre: "",
};

export default function AddBook() {

  const [addBook, { isLoading: isAdding }] = useCreateBookMutation();
  const navigate = useNavigate()

  const bookFormSchema = bookZodSchema.omit({
    _id: true,
    createdAt: true,
    updatedAt: true,
  });

  type BookFormType = z.infer<typeof bookFormSchema>;

  const form = useForm<BookFormType>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: previousData,
  });

  // const onSubmit = (data: Partial<IBook>) => {
  //   addBook(data);
  // };

  const onSubmit = async (data: Partial<IBook>) => {
    try {
      await addBook(data).unwrap();
      toast.success('Book Added Successfully')
      navigate('/books');
    } catch (error) {
      toast.error('Someting went wrong!')
      console.error("Book add failed:", error);
    }
  };

  return (
    <>
    <div className="my-5 text-center">
      <h1 className="text-5xl font-bold text-blue-600 uppercase italic">Add a New Book</h1>
      <p>Please fill requirment for add a book in <span className="text-blue-500 mt-3 font-bold">Book Shelf</span> Library</p>
    </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-6 p-4">
          {/* Title */}
          <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl><Input placeholder="Book title" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Author */}
          <FormField control={form.control} name="author" render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl><Input placeholder="Author name" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Genre Dropdown */}
          <FormField control={form.control} name="genre" render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-auto">
                    <SelectValue placeholder="Choose genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {["FICTION", "NON_FICTION", "HISTORY", "SCIENCE", "BIOGRAPHY", "FANTASY"].map((g) => (
                      <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* ISBN */}
          <FormField control={form.control} name="isbn" render={({ field }) => (
            <FormItem>
              <FormLabel>ISBN</FormLabel>
              <FormControl><Input placeholder="ISBN code" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Copies */}
          <FormField control={form.control} name="copies" render={({ field }) => (
            <FormItem>
              <FormLabel>Copies</FormLabel>
              <FormControl><Input type="number" placeholder="Number of copies" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Description */}
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl><Textarea placeholder="Short description" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Submit Button */}
          <Button type="submit" disabled={isAdding} className="w-full bg-blue-500 cursor-pointer">
            {isAdding ? "Adding..." : "Add Book"}
          </Button>
        </form>
      </Form>
    </>
  );
}
