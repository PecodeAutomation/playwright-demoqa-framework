export interface BaseFormUser {
  firstName: string;
  lastName: string;
  userName?: string;
  password?: string;
  address?: string;
}

export interface WebTablesFormUser extends BaseFormUser {
  email: string;
  age: string;
  salary: string;
  department: string;
}

export interface PracticeFormUser extends BaseFormUser {
  email: string;
  gender: "Male" | "Female" | "Other";
  mobile: string;
  subjects: string[];
  hobbies: ("Sports" | "Reading" | "Music")[];
  picture: string;
  state: string;
  city: string;
  age?: string;
  salary?: string;
  department?: string;
}
