import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useBorrowBookMutation } from "@/redux/api/borrowApi";

type BorrowFormData = {
  quantity: number;
  date: string;
};

type BorrowModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BorrowFormData) => void;
  availableQuantity: number;
  book: string,
};

export default function BorrowModal({
  isOpen,
  onClose,
  onSubmit,
  availableQuantity,
  book,
}: BorrowModalProps) {
  const { register, handleSubmit, reset } = useForm<BorrowFormData>();
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const submitHandler = async (data: BorrowFormData) => {
    if (data.quantity > availableQuantity) {
      toast.error(`Only ${availableQuantity} copies available.`);
      return;
    }

    try {
      await borrowBook({
        book: book,
        quantity: data.quantity,
        dueDate: data.date,
      }).unwrap();
      toast.success("Book borrowed successfully!");
      onSubmit(data)
      reset();
      onClose();
    } catch (error: any) {
      console.error("Borrow failed", error);
      toast.error("Failed to borrow book!");
    }
  };
  // console.log("Available Quantity inside modal:", availableQuantity);


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
          <p>Available Quantity: {availableQuantity}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Quantity</label>
            <Input
              type="number"
              min={1}
              {...register("quantity", { valueAsNumber: true, required: true })}
              placeholder="Enter quantity"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Return Date</label>
            <Input className="w-full" type="date" {...register("date", { required: true })} />
          </div>

          <DialogFooter>
            <Button className="cursor-pointer" variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button className="cursor-pointer bg-blue-500" type="submit">Request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
