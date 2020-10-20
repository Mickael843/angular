import { Phone } from './phone';
import { Profession } from './profession';

export class User {

    uuid: string;
    name: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phones: Array<Phone>;
    dateOfBirth: string;
    salary: DoubleRange;
    profession: Profession = new Profession();
}
