"use client";
import MovieCard from "@/Components/MovieCard";
import Modal from "@/Components/Modal";
import React from "react";
import { useState } from "react";

export default function Home() {

  // State management
  const [showNewMovieModal, setShowNewMovieModal] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: "",
    actors: [],
    year: 2025,
  });

  const handleAddMovie = () => {
    // Function
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prevState) => ({ ...prevState, [name]: value }));
  };

  // Test data (Remove)
  const testMovies = [
    {
      title: "Finding Nemo",
      actors: ["Leo Dicaprio", "Anne Hathaway"],
      year: 2002,
    },
    {
      title: "Some other Movie",
      actors: ["Denzel Washington", "Someone Else"],
      year: 2020,
    },
    {
      title: "Some other Movie Long Title",
      actors: ["Denzel Washington", "Someone Else"],
      year: 2020,
    },
  ];

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
          className="bg-blue-400 py-2 px-6 rounded text-black">
          + Add A New Movie
        </button>
      </div>

      <div>
        {testMovies.map((movie, index) => (
          <MovieCard key={index} item={movie} />
        ))}
      </div>

      <Modal showModal={showNewMovieModal} setShowModal={setShowNewMovieModal}>
        <form>
          <form className="text-gray-600">
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
              name="year"
              className="w-full p-2 mb-3 bg-gray-200"
              value={newMovie.year}
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
        </form>
      </Modal>
    </div>
  );
}
