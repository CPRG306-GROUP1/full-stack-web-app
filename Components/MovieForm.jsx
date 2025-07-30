// components/MovieForm.tsx
import { useState, useEffect } from "react";

import PropTypes from "prop-types";

export default function MovieForm({ onSave, existingMovie, onCancel }) {
  const [title, setTitle] = useState("");
  const [actors, setActors] = useState("");
  const [releaseYr, setReleaseYr] = useState("");

  useEffect(() => {
    if (existingMovie) {
      setTitle(existingMovie.title);
      setActors(existingMovie.actors.join(", "));
      setReleaseYr(existingMovie.releaseYr.toString());
    }
  }, [existingMovie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !actors || !releaseYr) return alert("All fields required");

    const newMovie = {
      title,
      actors: actors.split(",").map((a) => a.trim()),
      releaseYr: parseInt(releaseYr),
      id: existingMovie?.id,
    };
    onSave(newMovie);
    setTitle("");
    setActors("");
    setReleaseYr("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-lg font-bold mb-2">{existingMovie ? "Edit Movie" : "Add Movie"}</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="border p-2 w-full mb-2" />
      <input value={actors} onChange={(e) => setActors(e.target.value)} placeholder="Actors (comma-separated)" className="border p-2 w-full mb-2" />
      <input value={releaseYr} onChange={(e) => setReleaseYr(e.target.value)} placeholder="Release Year" type="number" className="border p-2 w-full mb-2" />
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">Save</button>
        {onCancel && <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-1 rounded">Cancel</button>}
      </div>
    </form>
  );
}

MovieForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  existingMovie: PropTypes.object,
  onCancel: PropTypes.func,
};
