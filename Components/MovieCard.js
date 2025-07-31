"use client"
import React from 'react'
import { useState } from 'react'
import Modal from './Modal'

const MovieCard = ({ item }) => {

    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [movieToEdit, setMovieToEdit] = useState({})

    // Handles value change in edit form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieToEdit((prevState) => ({ ...prevState, [name]: value }));
    };

    // Handle update movie
    const handleUpdate = () => {
        // FUNCTION
    }

    const handleDelete = () => {
        // FUNCTION
    }

    return (
        <div className='bg-blue-950 text-gray-200 p-6 mb-4 rounded-xl'>
            <div className='mb-4'>
                <h1 className='text-2xl font-semibold'>{item.title}</h1>
                <p>Release Year: {item.year}</p>
                <div className=''>
                    <p>Actors</p>
                    {item.actors.map((actor, index) => (
                        <p
                            className=''
                            key={index}>
                            {actor}
                        </p>
                    ))}
                </div>
            </div>

            <Modal showModal={showEditModal} setShowModal={setShowEditModal}>
                <form className='text-gray-600'>
                    <h1 className='font-semibold mb-5'>Update Movie</h1>
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
                                    setMovieToEdit(prev => ({ ...prev, actors: updatedActors }));
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const updatedActors = movieToEdit.actors.filter((_, i) => i !== index);
                                    setMovieToEdit(prev => ({ ...prev, actors: updatedActors }));
                                }}
                            >
                                x
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="text-blue-600 font-medium hover:underline mb-4"
                        onClick={() => setMovieToEdit(prev => ({
                            ...prev,
                            actors: [...prev.actors, '']
                        }))}
                    >
                        + Add Another Actor
                    </button>
                    <h2>Release Year</h2>
                    <input
                        type="number"
                        placeholder="Release Year"
                        name="year"
                        className="w-full p-2 mb-3 bg-gray-200"
                        value={movieToEdit.year}
                        onChange={handleChange}
                    />
                    <div className='flex justify-around'>
                        <button
                            type='button'
                            onClick={() => {
                                setMovieToEdit({})
                                setShowEditModal(false)
                            }}>
                            Cancel
                        </button>
                        {/* Needs an id in this function I assume */}
                        <button
                            type="button"
                            onClick={() => handleUpdate()}>
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
                <div className='text-gray-600'>
                    <h1 className='text-center mb-10'>Are you sure you would like to delete this movie?</h1>
                    <div className='flex justify-around'>
                        <button
                            onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </button>
                        {/* This also needs an ID */}
                        <button
                            onClick={() => handleDelete()}
                            className='text-red-500'>
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>

            <div className='flex justify-around'>
                <button
                    onClick={() => {
                        setMovieToEdit(item)
                        setShowEditModal(true)
                    }}
                    className='bg-gray-200 hover:bg-gray-400 duration-200 text-gray-900 p-2 rounded'>
                    Edit
                </button>
                <button
                    onClick={() => setShowDeleteModal(true)}
                    className='bg-red-500 hover:bg-red-700 duration-200 p-2 rounded' >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default MovieCard