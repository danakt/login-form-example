import { ReactNode } from 'react';

export type InputValidator = {
  validate: (value: string) => boolean;
  errorMessage: string;
};

export type FormItemInput<Name> = {
  type: 'text';
  name: Name;
  label: string;
  defaultValue?: string;
  validators?: InputValidator[];
  isRequired?: boolean;
};

export type FormItemPassword<Name> = {
  type: 'password';
  name: Name;
  label: string;
  isRequired?: boolean;
};

export type FormItemPasswordConfirmation<Name, For> = {
  type: 'password-confirmation';
  for: For;
  name: Name;
  label: string;
  isRequired?: boolean;
};

export type FormItemCheckbox<Name> = {
  type: 'checkbox';
  name: Name;
  text: ReactNode;
  isRequired?: boolean;
  isDefaultChecked?: boolean;
};

export type FormItemButton = {
  type: 'button';
  text: ReactNode;
  onClick: () => void;
  icon?: ReactNode;
};

export type FormItemSubmit = {
  type: 'submit';
  text: ReactNode;
};

export type FormItem<Name> =
  | FormItemInput<Name>
  | FormItemPassword<Name>
  | FormItemPasswordConfirmation<Name, Name>
  | FormItemCheckbox<Name>
  | FormItemButton
  | FormItemSubmit;

export type FormLayout<Name> = (FormItem<Name> | [FormItem<Name>, FormItem<Name>])[];
