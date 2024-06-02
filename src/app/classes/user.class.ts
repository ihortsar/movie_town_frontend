import { IUser } from '../interfaces/user.interface';


export class User {
    firstName
    lastName
    email
    birthday
    password1
    password2


    constructor(data?: IUser) {
        this.firstName = data?.first_name || ''
        this.lastName = data?.last_name || ''
        this.email = data?.email || ''
        this.birthday = data?.birthday || ''
        this.password1 = data?.password1 || ''
        this.password2 = data?.password2 || ''

    }
}