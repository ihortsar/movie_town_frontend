import { Movie } from "./movie.interface"

export interface IUser {
    id?: number
    first_name: string
    last_name: string
    birthday: string
    email: string
    password1: string
    password2: string
    selected_movies?: Movie[]
}