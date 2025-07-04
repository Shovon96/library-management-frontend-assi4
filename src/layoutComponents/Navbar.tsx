import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Book Shelf</span>
                </Link>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <div className="flex items-center gap-8">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                            <li>
                                <Link to={"/books"} className="block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-white dark:hover:text-white md:dark:hover:bg-transparent">All Books</Link>
                            </li>
                            <li>
                                <Link to={"/create-book"} className="block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-white dark:hover:text-white md:dark:hover:bg-transparent">+Add Book</Link>
                            </li>
                            <li>
                                <Link to={"/borrow-summary"} className="block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-white dark:hover:text-white md:dark:hover:bg-transparent">Book Summary</Link>
                            </li>
                        </ul>
                        <div>
                            <input type="text" placeholder=" 🔎 Search here" className="input border-2 rounded-sm" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
