import { Link } from "react-router-dom";

export default function HeroBanner() {
    return (
        <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80')",
      }}
    >
      {/* 🔳 Overlay */}
      <div className="absolute inset-0 bg-[#000000b5]"></div>

      {/* 💡 Content */}
      <div className="relative z-10 max-w-7xl w-full flex flex-col-reverse lg:flex-row items-center justify-between">
        {/* Left: Text Section */}
        <div className="text-white max-w-xl space-y-6 text-center lg:text-left">
          <h1 className="text-5xl font-bold">Welcome to Book Shelf</h1>
          <p className="text-lg">
            Find your books from Book Shelf library and add a book.
          </p>
          <div className="flex gap-4 justify-center lg:justify-start">
            <Link to={'/books'} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition">
              📚 All Books
            </Link>
            <Link to={'/create-book'} className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md transition">
              ➕ Add Book
            </Link>
          </div>
        </div>

        {/* Right: Image Section */}
        <div className="relative mt-10 lg:mt-0">
          <img
            src="https://i.ibb.co/JFxYj25G/happy-book-day-education-learning-is-shown-with-book-742418-36607.jpg"
            alt="Not Found Visual"
            className="w-140 rounded-lg shadow-2xl"
          />

          {/* 📚 Animated Icon (Top-left Corner) */}
          <div className="absolute -top-2 -left-2 bg-white p-2 rounded-lg shadow-md animate-bounce py-2 px-3"> <Link to={'/create-book'}>➕📘</Link>
          </div>
        </div>
      </div>
    </div>

    )
}
