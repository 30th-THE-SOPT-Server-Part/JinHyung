import { type } from "os";
import Movie from "../../models/Movie";

export type MovieOptionType = "title" | "director" | "title_director";

const DESCENDING = "desc";

export const findByOption = async (
  option: MovieOptionType,
  titleRegex: RegExp,
  page: number,
  perPage: number
) => {
  const total: number = await Movie.countDocuments({});
  const lastPage: number = Math.ceil(total / perPage); // 마지막 페이지
  const currentPage: number = page;

  if (option === "title" || "director") {
    const movies = await distinctSearch(titleRegex, page, perPage);
    return {
      currentPage,
      lastPage,
      movies,
    };
  }
  if (option === "title_director") {
    const movies = await orSearch(titleRegex, page, perPage);
    return {
      currentPage,
      lastPage,
      movies,
    };
  }

  throw new Error();
};

const distinctSearch = async (
  titleRegex: RegExp,
  page: number,
  perPage: number
) => {
  const movies = await Movie.find({ option: { $regex: titleRegex } })
    .sort({ createdAt: DESCENDING })
    .skip(perPage * (page - 1))
    .limit(perPage);

  validateMovies(movies);
  return movies;
};

const orSearch = async (titleRegex: RegExp, page: number, perPage: number) => {
  const movies = await Movie.find({
    $or: [
      { director: { $regex: titleRegex } },
      { title: { $regex: titleRegex } },
    ],
  })
    .sort({ createdAt: DESCENDING })
    .skip(perPage * (page - 1))
    .limit(perPage);

  validateMovies(movies);
  return movies;
};

const validateMovies = (movies: any[]) => {
  if (movies === []) {
    throw new Error("Empty array returned");
  }
};
