import { InputValidator } from '../types/form';

export const validateField = (value: string, validators: InputValidator[]): string | null => {
  if (validators) {
    for (let i in validators) {
      const { validate, errorMessage } = validators[i];

      if (!validate(value)) {
        return errorMessage;
      }
    }
  }

  return null;
};
