export interface ISignupDTO {
    email: string
    fullname: string
    password: string
    confirm_password: string
}
export interface ILoginDTO {
    email: string
    password: string
}