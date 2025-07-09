import { useGetBorrowSummaryQuery } from '@/redux/api/borrowApi'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import Loader from '@/layoutComponents/Loader'

export default function BorrowSummaryTable() {
    const { data: borrowBooks, isLoading, isError } = useGetBorrowSummaryQuery()

    if (isLoading) return <Loader />
    if (isError || !borrowBooks) return <div>Failed to load data</div>

    return (
        <div className="p-6 bg-white rounded-lg max-w-6xl m-auto my-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 Borrowed Book Summary</h2>
            <Table className="w-full border border-gray-400 rounded-md overflow-hidden">
                <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                        <TableHead className="text-white font-semibold px-4 py-3 text-lg">Sl</TableHead>
                        <TableHead className="text-white font-semibold px-4 py-3 text-lg">Book Title</TableHead>
                        <TableHead className="text-white font-semibold px-4 py-3 text-lg">ISBN</TableHead>
                        <TableHead className="text-white font-semibold px-4 py-3 text-lg">Total Quantity Borrowed</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {borrowBooks?.data?.map((item: any, index: number) => (
                        <TableRow
                            key={index}
                            className={index % 2 === 0 ? 'bg-gray-50 hover:bg-blue-50' : 'bg-white hover:bg-blue-100'}
                        >
                            <TableCell className="px-4 py-3 text-base text-gray-800 font-medium">{index + 1}</TableCell>
                            <TableCell className="px-4 py-3 text-base text-gray-700 font-semibold">{item?.book.title}</TableCell>
                            <TableCell className="px-4 py-3 text-base text-gray-600">{item?.book.isbn}</TableCell>
                            <TableCell className="px-4 py-3 text-base text-blue-700 font-semibold">{item.totalQuantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
