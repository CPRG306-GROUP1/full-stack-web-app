import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// DELETE request to delete a specific movie by ID
export const DELETE = async (request, { params }) => {
  try {
    const { id } = await params;

    // Check if movie exists before deleting
    const existingMovie = await client.movie.findUnique({
      where: { id },
    });

    if (!existingMovie) {
      return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    }

    await client.movie.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: `Movie with ID ${id} was deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting movie:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

// GET request to fetch a specific movie by ID
export const GET = async (request, { params }) => {
  try {
    const { id } = await params;

    const movie = await client.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(movie, { status: 200 });
  } catch (error) {
    console.error("Error fetching movie:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

// PATCH request to update a specific movie by ID
export const PATCH = async (request, { params }) => {
  try {
    const body = await request.json();
    const { id } = await params;
    const { title, actors, releaseYear } = body;

    const updateMovie = await client.movie.update({
      where: { id },
      data: {
        title,
        actors,
        releaseYear,
      },
    });

    return NextResponse.json(updateMovie, { status: 200 });
  } catch (error) {
    console.error("Error updating movie:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
