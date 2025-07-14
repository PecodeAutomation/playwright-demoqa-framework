import { faker } from "@faker-js/faker/locale/en";
import { UserData } from "../types/user-data";
import { PracticeFormUser, WebTablesFormUser } from "../types/interfaces/user";

export class UserDataFactory {
  static getRandomUser(): WebTablesFormUser {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 99 }).toString(),
      salary: faker.number.int({ min: 1000, max: 10000 }).toString(),
      department: faker.commerce.department(),
      userName: faker.internet.username(),
      password: faker.internet.password({ length: 12 }),
      address: faker.location.streetAddress(),
    };
  }

  static getInvalidUser(): WebTablesFormUser {
    return {
      firstName: UserData.EMPTY_VALUE,
      lastName: UserData.NUMBERS,
      email: UserData.INVALID_EMAIL,
      age: UserData.EMPTY_VALUE,
      salary: UserData.EMPTY_VALUE,
      department: UserData.EMPTY_VALUE,
      userName: UserData.SYMBOLS,
      password: UserData.EMPTY_VALUE,
      address: UserData.EMPTY_VALUE,
    };
  }

  static getRandomPracticeFormUser(): PracticeFormUser {
    const baseUser = this.getRandomUser();
    const gender = faker.helpers.arrayElement([
      "Male",
      "Female",
      "Other",
    ] as const);
    const hobbies = faker.helpers.arrayElements(
      ["Sports", "Reading", "Music"] as const,
      { min: 1, max: 3 }
    );
    const stateCity = this.getRandomStateAndCity();

    return {
      ...baseUser,
      gender,
      mobile: faker.string.numeric(10),
      subjects: faker.helpers.arrayElements(
        [
          "Maths",
          "English",
          "Physics",
          "Chemistry",
          "Computer Science",
          "Economics",
          "Arts",
        ],
        { min: 1, max: 3 }
      ),
      hobbies,
      picture: "test-data/Test-Logo.svg.png",
      state: stateCity.state,
      city: stateCity.city,
      age: undefined,
      salary: undefined,
      department: undefined,
    };
  }

  private static getRandomStateAndCity(): { state: string; city: string } {
    const states = [
      { state: "NCR", cities: ["Delhi", "Gurgaon", "Noida"] },
      { state: "Uttar Pradesh", cities: ["Agra", "Lucknow", "Merrut"] },
      { state: "Haryana", cities: ["Karnal", "Panipat"] },
      { state: "Rajasthan", cities: ["Jaipur", "Jaiselmer"] },
    ];

    const randomState = faker.helpers.arrayElement(states);
    return {
      state: randomState.state,
      city: faker.helpers.arrayElement(randomState.cities),
    };
  }

  static getMinimalPracticeFormUser(): PracticeFormUser {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      gender: faker.helpers.arrayElement(["Male", "Female", "Other"] as const),
      mobile: faker.string.numeric(10),
      subjects: [],
      hobbies: [],
      picture: "test-data/Test-Logo.svg.png",
      state: "NCR",
      city: "Delhi",
      age: undefined,
      salary: undefined,
      department: undefined,
    };
  }
}
