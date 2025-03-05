export interface IPasswordReset {
    email: string;
    token?: string;
    newPassword: string;
}