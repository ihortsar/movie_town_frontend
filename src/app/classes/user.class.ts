export interface User {
    firstName: string
    lastName: string
    birthday: string
    email: string
    password1: string
    password2: string

}

export class User {
    firstName
    lastName
    email
    birthday
    password1
    password2


    constructor(data?: User) {
        this.firstName = data?.firstName || ''
        this.lastName = data?.lastName || ''
        this.email = data?.email || ''
        this.birthday = data?.birthday || ''
        this.password1= data?.password1 || ''
        this.password2= data?.password2 || ''

    }
}