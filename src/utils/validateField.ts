export type InputValidator = {
  validate: (value: string) => boolean;
  errorMessage: string;
};

export type FieldValidationResult = {
  isValid?: boolean;
  errorMessage?: string;
};

export const validateFieldValue = (value: string, validators: InputValidator[]): FieldValidationResult => {
  if (validators) {
    for (let i in validators) {
      const { validate, errorMessage } = validators[i];

      if (!validate(value)) {
        return {
          isValid: false,
          errorMessage,
        };
      }
    }
  }

  return {
    isValid: true,
    errorMessage: undefined,
  };
};
