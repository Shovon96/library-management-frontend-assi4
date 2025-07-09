import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // or any icon you prefer

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-3">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Book Shelf Logo" />
                    <span className="self-center text-2xl font-semibold">Book Shelf</span>
                </Link>

                {/* Mobile menu button */}
                <button
                    className="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden hover:bg-purple-600 focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Menu items */}
                <div className={`${isMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto`}>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-8 gap-4 mt-4 md:mt-0">
                        <ul className="font-medium flex flex-col md:flex-row md:space-x-8">
                            <li>
                                <Link to="/books" className="block py-2 px-3 hover:text-orange-500">
                                    All Books
                                </Link>
                            </li>
                            <li>
                                <Link to="/create-book" className="block py-2 px-3 hover:text-orange-500">
                                    +Add Book
                                </Link>
                            </li>
                            <li>
                                <Link to="/borrow-summary" className="block py-2 px-3 hover:text-orange-500">
                                    Borrow Summary
                                </Link>
                            </li>
                        </ul>

                        {/* Search Input */}
                        <div className="md:ml-4">
                            <input
                                type="text"
                                placeholder="🔎 Search here"
                                className="border-2 rounded-sm px-2 py-1 text-black"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
