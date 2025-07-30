import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-[70vh] p-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to IMR Movie Portal
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Internet Movies Rental Company Database Management System
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Manage Movies</h2>
          <p className="text-gray-600 mb-4">
            Add, edit, and delete movies from our comprehensive database. 
            Keep track of titles, actors, and release years.
          </p>
          <Link 
            href="/movies" 
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            View Movies
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">Add New Movie</h2>
          <p className="text-gray-600 mb-4">
            Quickly add new movies to the database with our easy-to-use form. 
            Include all necessary details for comprehensive cataloging.
          </p>
          <Link 
            href="/add-movie" 
            className="inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Add Movie
          </Link>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-3 text-blue-800">Features</h3>
        <ul className="space-y-2 text-blue-700">
          <li>✓ Complete movie database management</li>
          <li>✓ Add, edit, and delete movie entries</li>
          <li>✓ Track actors and release years</li>
          <li>✓ Responsive design for all devices</li>
          <li>✓ Real-time data validation</li>
        </ul>
      </div>
    </div>
  )
}