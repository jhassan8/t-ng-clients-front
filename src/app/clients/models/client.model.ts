import { District } from './district.model';

export class Client {

    id: number;
    name: string;
    surname: string;
    email: string;
    createAt: Date;
    avatar: string;
    district: District

}