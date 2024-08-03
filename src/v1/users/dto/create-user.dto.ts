import { UserRole } from "../../../commons/enums/UserRole.enum.js";

export interface CreateUserDto {
    username: string;
    password: string;
    email: string;
    fullname?: string;
    phone: string;
    is_active?: boolean;
    role?: UserRole;
}
