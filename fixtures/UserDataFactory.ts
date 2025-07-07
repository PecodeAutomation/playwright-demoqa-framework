import { faker } from '@faker-js/faker/locale/en';
import { UserData } from '../types/user-data';

export interface User {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  age?: number;
  address?: string;
}

export class UserDataFactory {
  static getRandomUser(): User {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      userName: faker.internet.username(),
      password: faker.internet.password({ length: 12 }),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 80 }),
      address: faker.location.streetAddress()
    };
  }

  static getInvalidUser(): User {
    return {
      firstName: UserData.EMPTY_VALUE,
      lastName: UserData.NUMBERS,
      userName: UserData.SYMBOLS,
      password: UserData.EMPTY_VALUE,
      email: UserData.INVALID_EMAIL
    };
  }
}