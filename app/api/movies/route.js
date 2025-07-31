//http://localhost:3000/api/movies

import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { title, actors, releaseYear } = body;

    const newMovie = await client.movie.create({
      data: {
        title,
        actors,
        releaseYear,
      },
    });
    return NextResponse.json(newMovie, { status: 201 });
  } catch (error) {
    console.error("Error creating movie:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    const movies = await client.movie.findMany();
    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  try {
    const body = await request.json();
    const { id } = params;
    const { title, actors, releaseYear } = body;

    const updateMovie = await client.movie.update({
      where: {
        id,
      },
      data: {
        title,
        actors,
        releaseYear,
      },
    });

    if (!updateMovie) {
      return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    }
    return NextResponse.json(updateMovie, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

// DELETE request to delete a specific movie by ID

export const DELETE = async (request, { params }) => {
  try {
    const { id } = await params;
    await client.movie.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { message: `Movie with ID ${id} was deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
