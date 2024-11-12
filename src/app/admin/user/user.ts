import { FormUtils } from "src/app/shared/utils/form.util";
import { Mapper } from "src/app/shared/utils/mapper";

export interface iUser {
    firstName: string;
    lastName: string;
    middleName: string;
    status: string;
    createdAt: Date;
    userName: string;
    password: string;
    id: number;
    email: string;
}
export class UserDTO implements iUser {
    firstName: string;
    lastName: string;
    middleName: string;
    status: string;
    createdAt: Date;
    userName: string;
    password: string;
    id: number;
    email: string;
    
    userMapper(data) {
        const userMapper = new Mapper<iUser, UserDTO>((users: UserDTO): UserDTO => {
            return users;
        })
        return userMapper.map(data);
    }
    usersMapper(data) {
        const userMapper = new Mapper<iUser[], UserDTO[]>((users: UserDTO[]): UserDTO[] => {
            return users;
        })
        return userMapper.map(data);
    }
}
export class UserForm extends FormUtils {
    firstName: string;
    lastName: string;
    middleName: string;
    status: string;
    createdAt: Date;
    userName: string;
    password: string;
    id: number;
    email: string;
    fill (data: UserDTO) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.middleName = data.middleName;
        this.userName = data.userName;
        this.password = data.password;
        this.status = data.status;
        this.createdAt = data?.createdAt;
        this.id = data?.id;
        this.email = data?.email;
    }
}