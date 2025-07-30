import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Company Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="bg-red-600 p-2 rounded">
              <span className="font-bold text-xl">IMR</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Internet Movies Rental</h1>
              <p className="text-sm text-blue-200">Movie Database Portal</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-blue-200 transition-colors">
              Home
            </Link>
            <Link href="/movies" className="hover:text-blue-200 transition-colors">
              Movies
            </Link>
            <Link href="/add-movie" className="hover:text-blue-200 transition-colors">
              Add Movie
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar