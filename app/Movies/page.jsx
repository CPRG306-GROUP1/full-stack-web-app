'use client'

import { useState, useEffect } from 'react'
import MovieCard from '../../components/MovieCard'
import MovieForm from '../../Components/MovieForm'

export default function MoviesPage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingMovie, setEditingMovie] = useState(null)
  const [showForm, setShowForm] = useState(false)

  // Fetch movies from API
  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/movies')
      if (response.ok) {
        const data = await response.json()
        setMovies(data)
      }
    } catch (error) {
      console.error('Error fetching movies:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  // Handle movie editing
  const handleEdit = (movie) => {
    setEditingMovie(movie)
    setShowForm(true)
  }

  // Handle movie deletion
  const handleDelete = async (movieId) => {
    try {
      const response = await fetch(`/api/movies/${movieId}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setMovies(movies.filter(movie => movie.id !== movieId))
      }
    } catch (error) {
      console.error('Error deleting movie:', error)
    }
  }

  // Handle form submission for editing
  const handleFormSubmit = async (movieData) => {
    try {
      const url = editingMovie 
        ? `/api/movies/${editingMovie.id}` 
        : '/api/movies'
      
      const method = editingMovie ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      })

      if (response.ok) {
        await fetchMovies() // Refresh the list
        setShowForm(false)
        setEditingMovie(null)
      }
    } catch (error) {
      console.error('Error saving movie:', error)
    }
  }

  // Handle form cancellation
  const handleFormCancel = () => {
    setShowForm(false)
    setEditingMovie(null)
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="loading w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading movies...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[70vh] p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Movies Database</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Add New Movie
        </button>
      </div>

      {/* Movie Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <MovieForm
                movie={editingMovie}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
              />
            </div>
          </div>
        </div>
      )}

      {/* Movies List */}
      {movies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">No movies found in the database.</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Your First Movie
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}