"use client";
import React from "react";
import { useState } from "react";
import Modal from "./Modal";
import axios from "axios";

const MovieCard = ({ item, onMovieDeleted, onMovieUpdated }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Handles value change in edit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieToEdit((prevState) => ({
      ...prevState,
      [name]: name === "releaseYear" ? parseInt(value) || 0 : value,
    }));
  };

  // Handle update movie
  const handleUpdate = async () => {
    try {
      setIsUpdating(true);

      // Validate required fields
      if (!movieToEdit.title || !movieToEdit.releaseYear) {
        alert("Please fill in all required fields (Title and Release Year)");
        return;
      }

      // Filter out empty actors
      const filteredActors = movieToEdit.actors.filter(
        (actor) => actor.trim() !== ""
      );

      const updatedMovieData = {
        title: movieToEdit.title,
        actors: filteredActors,
        releaseYear: parseInt(movieToEdit.releaseYear) || 0,
      };

      const response = await axios.patch(
        `/api/movies/${item.id}`,
        updatedMovieData
      );

      if (response.status === 200) {
        console.log("Movie updated successfully");
        setShowEditModal(false);
        setMovieToEdit({});
        // Call the callback function to refresh the movies list
        if (onMovieUpdated) {
          onMovieUpdated();
        }
      }
    } catch (error) {
      console.error("Error updating movie:", error);
      alert("Failed to update movie. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(`/api/movies/${item.id}`);

      if (response.status === 200) {
        console.log("Movie deleted successfully");
        setShowDeleteModal(false);
        // Call the callback function to refresh the movies list
        if (onMovieDeleted) {
          onMovieDeleted();
        }
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert("Failed to delete movie. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-blue-950 text-gray-200 p-6 mb-4 rounded-xl  min-w-xl">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">{item.title}</h1>
        <p>Release Year: {item.releaseYear}</p>
        <div className="">
          <p>Actors</p>
          {item.actors.map((actor, index) => (
            <p className="" key={index}>
              {actor}
            </p>
          ))}
        </div>
      </div>

      <Modal showModal={showEditModal} setShowModal={setShowEditModal}>
        <form className="text-gray-600">
          <h1 className="font-semibold mb-5">Update Movie</h1>
          <h2>Title</h2>
          <input
            type="text"
            placeholder="title"
            name="title"
            className="w-full p-2 mb-3 bg-gray-200"
            value={movieToEdit.title}
            onChange={handleChange}
          />
          <h2>Actors</h2>
          {movieToEdit.actors?.map((actor, index) => (
            <div key={index} className="flex items-center gap-2 mb-3">
              <input
                type="text"
                placeholder="Actor"
                name="actors"
                className="w-full p-2 bg-gray-200"
                value={actor}
                onChange={(e) => {
                  const updatedActors = [...movieToEdit.actors];
                  updatedActors[index] = e.target.value;
                  setMovieToEdit((prev) => ({
                    ...prev,
                    actors: updatedActors,
                  }));
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const updatedActors = movieToEdit.actors.filter(
                    (_, i) => i !== index
                  );
                  setMovieToEdit((prev) => ({
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
              setMovieToEdit((prev) => ({
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
            value={movieToEdit.releaseYear}
            onChange={handleChange}
          />
          <div className="flex justify-around">
            <button
              type="button"
              onClick={() => {
                setMovieToEdit({});
                setShowEditModal(false);
              }}
              disabled={isUpdating}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleUpdate()}
              disabled={isUpdating}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded disabled:opacity-50"
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
        <div className="text-gray-600">
          <h1 className="text-center mb-10">
            Are you sure you would like to delete this movie?
          </h1>
          <p className="text-center mb-6 text-sm">
            <strong>{item.title}</strong> will be permanently removed.
          </p>
          <div className="flex justify-around">
            <button
              onClick={() => setShowDeleteModal(false)}
              disabled={isDeleting}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete()}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>

      <div className="flex justify-around">
        <button
          onClick={() => {
            setMovieToEdit(item);
            setShowEditModal(true);
          }}
          className="bg-gray-200 hover:bg-gray-400 duration-200 text-gray-900 p-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="bg-red-500 hover:bg-red-700 duration-200 p-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
