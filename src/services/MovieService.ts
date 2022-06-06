import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { promHandler } from "../interfaces/common/promHandler";
import { MovieCommentCreateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieCommentUpdateDto } from "../interfaces/movie/MovieCommentUpdateDto";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieCommentInfo, MovieInfo } from "../interfaces/movie/MovieInfo";
import {
  MovieOptionType,
  findByOption,
} from "../interfaces/movie/MovieOptionType";
import { MovieResponseDto } from "../interfaces/movie/MovieResponseDto";
import { MovieSearchResponseDto } from "../interfaces/movie/MovieSearchResponseDto";
import { MovieUpdateDto } from "../interfaces/movie/MovieUpdateDto";
import Movie from "../models/Movie";

const createMovie = async (
  movieCreateDto: MovieCreateDto
): Promise<PostBaseResponseDto> => {
  try {
    const movie = new Movie(movieCreateDto);

    await movie.save();

    const data = {
      _id: movie._id,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createMovieComment = async (
  movieId: string,
  movieCommentCreateDto: MovieCommentCreateDto
): Promise<MovieInfo | null> => {
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return null;
    const newComments: MovieCommentInfo[] = [
      ...movie.comments,
      movieCommentCreateDto,
    ];

    const updateMovie = await Movie.findOneAndUpdate(
      { _id: movieId },
      { comments: newComments },
      { new: true }
    );

    if (!updateMovie) return null;

    return updateMovie;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getMovie = async (movieId: string): Promise<MovieResponseDto | null> => {
  try {
    const movie = await Movie.findById(movieId).populate(
      "comments.writer",
      "name"
    );
    if (!movie) return null;

    return movie;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateMovieComment = async (
  movieId: string,
  commentId: string,
  userId: string,
  movieCommentUpdateDto: MovieCommentUpdateDto
): Promise<MovieInfo | null> => {
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return null;

    const data = await Movie.findOneAndUpdate(
      {
        _id: movieId,
        comments: { $elemMatch: { _id: commentId, writer: userId } },
      },
      {
        $set: {
          "comments.$.writer": userId,
          "comments.$.comment": movieCommentUpdateDto.comment,
        },
      },
      { new: true }
    );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateMovie = async (
  movieId: string,
  MovieUpdateDto: MovieUpdateDto
): Promise<MovieResponseDto | null> => {
  const [updatedMovie, err] = await promHandler(
    Promise.resolve(
      Movie.findByIdAndUpdate(movieId, MovieUpdateDto, {
        new: true,
      })
    )
  );

  if (err) {
    console.log(err);
    throw err;
  }

  if (!updatedMovie) {
    return null;
  }

  const data = {
    _id: updatedMovie._id,
    title: updatedMovie.title,
    director: updatedMovie.director,
    startDate: updatedMovie.startDate,
    thumbnail: updatedMovie.thumbnail,
    story: updatedMovie.story,
  };

  return data;
};

const deleteMovie = async (movieId: string) => {
  const [_, err] = await promHandler(
    Promise.resolve(Movie.findByIdAndDelete(movieId))
  );
  if (err) {
    console.log(err);
    throw err;
  }
};

const getMoviesBySearch = async (
  search: string,
  option: MovieOptionType,
  page: number
): Promise<MovieSearchResponseDto | null> => {
  const regex = (pattern: string) => new RegExp(`.*${pattern}.*`);
  const perPage: number = 2;
  const titleRegex = regex(search);

  return findByOption(option, titleRegex, page, perPage);
};

export default {
  createMovie,
  createMovieComment,
  getMovie,
  updateMovieComment,
  updateMovie,
  deleteMovie,
  getMoviesBySearch,
};
