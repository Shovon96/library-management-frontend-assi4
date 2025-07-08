import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDeleteBookMutation, useGetBookQuery } from "@/redux/api/baseApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "@/layoutComponents/Loader";
import { SquarePen } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import BorrowModal from "@/layoutComponents/BorrowModal";

export default function BookDetails() {

    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>();
    const { data: book, isLoading: loadingBookDetails, refetch } = useGetBookQuery(id);

    // Delete Mutation for delete a book
    const [deleteBook] = useDeleteBookMutation()
    // console.log(isSuccess);
    const deleteBookSubmit = async (bookId: any) => {
        try {
            await deleteBook(bookId).unwrap();
            toast.success('Book Deleted Successfully');
            navigate('/books')
        } catch (error) {
            toast.error('Something went wrong');
            console.error("Delete failed:", error);
        }
    };

    // For Modal open
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<{ id: string; availableQuantity: number } | null>(null);

    const handleBorrowRequest = (data: { quantity: number; date: string }) => {
        setIsModalOpen(false);
    };

    const openModal = (book: { _id: string; copies: number }) => {
        setSelectedBook({ id: book._id, availableQuantity: book.copies });
        setIsModalOpen(true);
    };

    if (loadingBookDetails) return <Loader />;

    return (
        <div className="relative max-w-3xl mx-auto p-4 my-8">
            <h1 className="text-6xl text-center mb-8 text-fuchsia-500 italic">{book?.data?.title}</h1>
            {/* Background Image */}
            <div className="h-96 w-full rounded-lg overflow-hidden">
                <img
                    src={book?.data?.image || "https://i.ibb.co/JFxYj25G/happy-book-day-education-learning-is-shown-with-book-742418-36607.jpg"}
                    alt={book?.data?.title || "Book Cover"}
                    className="object-cover h-full w-full"
                />
            </div>

            {/* Book Details Card */}
            <Card className="relative -mt-10 mx-4 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{book?.data?.title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">
                    <p><strong>Author:</strong> {book?.data?.author}</p>
                    <p><strong>Genre:</strong> {book?.data?.genre}</p>
                    <p><strong>ISBN:</strong> {book?.data?.isbn}</p>
                    <p><strong>Copies:</strong> {book?.data?.copies}</p>
                    <p>
                        <strong>Status:</strong> {book?.data?.copies > 0 ? (
                            <span className="text-green-600">Available</span>
                        ) : (
                            <span className="text-red-600">Unavailable</span>
                        )}
                    </p>
                    <p><strong>Description:</strong> {book?.data?.description}</p>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <Link className="flex gap-2 items-center" to={`/edit-book/${book?.data?._id}`}>
                            <Button className="bg-yellow-500 cursor-pointer"><SquarePen />Edit Book</Button>
                        </Link>
                        <Button onClick={() => deleteBookSubmit(book?.data?._id)} className="cursor-pointer" variant="destructive">Delete</Button>
                        <Button
                            className="cursor-pointer bg-blue-500"
                            disabled={!book?.data?.copies}
                            onClick={() => openModal(book?.data)}
                        >Borrow</Button>
                    </div>
                </CardContent>
            </Card>
            {/* Borrow Moda Import */}
            {selectedBook && (
                <BorrowModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={(borrowData) => {
                        handleBorrowRequest(borrowData);
                        refetch()
                    }}
                    availableQuantity={selectedBook.availableQuantity}
                    book={selectedBook.id}
                />
            )}
        </div>
    );
}
