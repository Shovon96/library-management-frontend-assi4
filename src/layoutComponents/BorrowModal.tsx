import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type BorrowFormData = {
  quantity: number;
  date: string;
};

type BorrowModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BorrowFormData) => void;
  availableQuantity: number;
};

export default function BorrowModal({
  isOpen,
  onClose,
  onSubmit,
  availableQuantity,
}: BorrowModalProps) {
  const { register, handleSubmit, reset } = useForm<BorrowFormData>();

  const submitHandler = (data: BorrowFormData) => {
    if (data.quantity > availableQuantity) {
      toast.error(`Only ${availableQuantity} copies available.`)
      return;
    }
    onSubmit(data);
    reset();
    onClose();
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
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
