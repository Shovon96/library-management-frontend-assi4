import { Link } from "react-router-dom";

export default function Footer() {
    return (


        <footer className="bg-white bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link to={'/'} className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Book Shelf</span>
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 dark:text-white">
                        <li>
                            <Link to={'/books'} className="hover:underline me-4 md:me-6">All Books</Link>
                        </li>
                        <li>
                            <Link to={'/create-book'} className="hover:underline me-4 md:me-6">+Add Book</Link>
                        </li>
                        <li>
                            <Link to={'/borrow-summary'} className="hover:underline me-4 md:me-6">Borrow Summary</Link>
                        </li>
                        <li>
                            <Link to={'/contact'} className="hover:underline">Contact</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-white sm:text-center dark:text-white">© 2025 Book Shelf™ all Rights Reserved.</span>
            </div>
        </footer>


    )
}
