import { ILogin } from './ILogin';

export interface IRegister extends ILogin {
    username: string;
    confirmPassword: string;
}