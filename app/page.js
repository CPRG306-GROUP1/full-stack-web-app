"use client";
import MovieCard from "@/Components/MovieCard";
import Modal from "@/Components/Modal";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // State management
  const [showNewMovieModal, setShowNewMovieModal] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMovie, setNewMovie] = useState({
    title: "",
    actors: [],
    releaseYear: 2025,
  });

  // Fetch movies from database
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/movies");
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMovie = (e) => {
    // Function
    axios
      .post("/api/movies", newMovie)
      .then((res) => {
        console.log(res);
        fetchMovies();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setNewMovie({
          title: "",
          actors: [],
          releaseYear: 2025,
        });
        setShowNewMovieModal(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prevState) => ({
      ...prevState,
      [name]: name === "releaseYear" ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <div className="font-sans items-center justify-items-center min-h-screen sm:p-20 bg-gray-300 text-gray-900">
      <h1 className="text-3xl mb-10">Welcome to Movies Database</h1>
      <p className="text-center">
        Browse the selection of movies below or add your own!
      </p>

      <h2 className="my-10 text-2xl">- Movies List -</h2>

      <div className="mb-8">
        <button
          onClick={() => setShowNewMovieModal(true)}
          className="bg-blue-400 py-2 px-6 rounded text-black"
        >
          + Add A New Movie
        </button>
      </div>

      <div>
        {loading ? (
          <p className="text-center">Loading movies...</p>
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              item={movie}
              onMovieDeleted={fetchMovies}
              onMovieUpdated={fetchMovies}
            />
          ))
        ) : (
          <p className="text-center">No movies found. Add your first movie!</p>
        )}
      </div>

      <Modal showModal={showNewMovieModal} setShowModal={setShowNewMovieModal}>
        <form className="text-gray-600" onSubmit={(e) => handleAddMovie(e)}>
          <h1 className="font-semibold mb-5">Update Movie</h1>
          <h2>Title</h2>
          <input
            type="text"
            placeholder="title"
            name="title"
            className="w-full p-2 mb-3 bg-gray-200"
            value={newMovie.title}
            onChange={handleChange}
          />
          <h2>Actors</h2>
          {newMovie.actors?.map((actor, index) => (
            <div key={index} className="flex items-center gap-2 mb-3">
              <input
                type="text"
                placeholder="Actor"
                name="actors"
                className="w-full p-2 bg-gray-200"
                value={actor}
                onChange={(e) => {
                  const updatedActors = [...newMovie.actors];
                  updatedActors[index] = e.target.value;
                  setNewMovie((prev) => ({
                    ...prev,
                    actors: updatedActors,
                  }));
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const updatedActors = newMovie.actors.filter(
                    (_, i) => i !== index
                  );
                  setNewMovie((prev) => ({
                    ...prev,
                    actors: updatedActors,
                  }));
                }}
              >
                x
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-blue-600 font-medium hover:underline mb-4"
            onClick={() =>
              setNewMovie((prev) => ({
                ...prev,
                actors: [...prev.actors, ""],
              }))
            }
          >
            + Add Another Actor
          </button>
          <h2>Release Year</h2>
          <input
            type="number"
            placeholder="Release Year"
            name="releaseYear"
            className="w-full p-2 mb-3 bg-gray-200"
            value={parseInt(newMovie.releaseYear)}
            onChange={handleChange}
          />
          <div className="flex justify-around">
            <button
              type="button"
              onClick={() => {
                setNewMovie({});
                setShowNewMovieModal(false);
              }}
            >
              Cancel
            </button>
            {/* Needs an id in this function I assume */}
            <button type="button" onClick={() => handleAddMovie()}>
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
