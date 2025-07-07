import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import Loader from "@/layoutComponents/Loader";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import BorrowModal from "@/layoutComponents/BorrowModal";

export default function AllBooks() {

  const [sortBy, setSortBy] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  
  // Get all books data for the table
  const { data, isLoading, refetch } = useGetBooksQuery({
    sortBy,
    sort: sortOrder,
    page,
    limit
  });
  
  // Delete Mutation for delete a book
  const [deleteBook] = useDeleteBookMutation()
  // console.log(isSuccess);
  const deleteBookSubmit = async (bookId: any) => {
    try {
      await deleteBook(bookId).unwrap();
      toast.success('Book Deleted Successfully');
    } catch (error) {
      toast.error('Something went wrong');
      console.error("Delete failed:", error);
    }
  };
  
  const columns = ["Sl", "Title", "Author", "Genre", "ISBN", "Copies", "Description", "Status", "Actions"];
  
  
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
  
  if (isLoading) return <Loader />;
  
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {/* sorting */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Book Collection Management</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              Sort <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {
              setSortBy("title");
              setSortOrder("asc");
            }}>Title Ascending</DropdownMenuItem>

            <DropdownMenuItem onClick={() => {
              setSortBy("title");
              setSortOrder("desc");
            }}>Title Descending</DropdownMenuItem>

            <DropdownMenuItem onClick={() => {
              setSortBy("copies");
              setSortOrder("desc");
            }}>Copies High to Low</DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Book data Table */}
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, i) => (
              <TableHead key={i}>{col}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {!isLoading && data?.data?.map((book: any, index: number) => (
            <TableRow key={book._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>{book.description}</TableCell>
              <TableCell>
                <span className={`text-sm px-2 py-1 rounded-full ${book.copies > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {book.copies > 0 ? "Available" : "Unavailable"}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link to={`/books/${book._id}`}><Button size="sm" className="bg-yellow-500 cursor-pointer">Edit</Button></Link>
                  <Button onClick={() => deleteBookSubmit(book._id)} className="cursor-pointer" size="sm" variant="destructive">Delete</Button>
                  {/* <Button size="sm" disabled={!book.copies}>Borrow</Button> */}
                  <div>
                    <Button className="cursor-pointer bg-blue-500" onClick={() => openModal(book)}>Borrow</Button>

                    {/* {selectedBook && (
                      <BorrowModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleBorrowRequest}
                        availableQuantity={selectedBook.availableQuantity}
                        book={book?._id}
                      />
                    )} */}
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination buttons */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span>Page {page}</span>
        <Button
          variant="outline"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
      {selectedBook && (
        <BorrowModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(borrowData) => {
            handleBorrowRequest(borrowData);
            refetch(); // ✅ borrow এর পর list refresh
          }}
          availableQuantity={selectedBook.availableQuantity} // ✅ ঠিক মত pass holo
          book={selectedBook.id} // ✅ ঠিক মত pass holo
        />
      )}
    </div>
  );
}
