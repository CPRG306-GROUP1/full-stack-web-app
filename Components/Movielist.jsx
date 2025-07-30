// components/MovieList.jsx

/**
 * @typedef {Object} Movie
 * @property {string} id
 * @property {string} title
 * @property {string[]} actors
 * @property {number} releaseYr
 */

/**
 * @typedef {Object} Props
 * @property {Movie[]} movies
 * @property {(movie: Movie) => void} onEdit
 * @property {(id: string) => void} onDelete
 */

/**
 * @param {Props} props
 */
export default function MovieList({ movies, onEdit, onDelete }) {
  return (
    <div className="mt-4">
      {movies.length === 0 && <p>No movies available.</p>}
      {movies.map((movie) => (
        <div key={movie.id} className="border rounded p-4 mb-2 shadow">
          <h3 className="text-xl font-bold">{movie.title}</h3>
          <p><strong>Actors:</strong> {movie.actors.join(", ")}</p>
          <p><strong>Release Year:</strong> {movie.releaseYr}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={() => onEdit(movie)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
            <button onClick={() => onDelete(movie.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
