import { InputValidator } from './validateField';

export const validatorRequiredField: InputValidator = {
  validate: (value: string) => value.length > 0,
  errorMessage: 'Required field',
};

export const validatorPasswordConfirmation = (compareValue: string): InputValidator => ({
  validate: (value: string) => value === compareValue,
  errorMessage: 'Passwords are not equal',
});

export const validatorLatinLetters: InputValidator = {
  validate: (value: string) => /^[A-z]+$/.test(value),
  errorMessage: 'Only latin letters',
};

export const validatorEmail: InputValidator = {
  validate: (email: string) => {
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email.toLowerCase()
    );
  },
  errorMessage: 'Incorrect email format',
};
