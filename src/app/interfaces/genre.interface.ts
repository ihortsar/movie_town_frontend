import { Movie } from "./movie.interface";

export interface Genre {
  name: string,
  movies: Movie[],
  id?: number
}