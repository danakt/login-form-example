import { ReactNode } from 'react';
import { InputValidator } from '../utils/validateField';
import { JoinObjectsIntersection, UnionToIntersection } from './utils';

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
  validators?: InputValidator[];
  isRequired?: boolean;
};

export type FormItemPasswordConfirmation<Name, For> = {
  type: 'password-confirmation';
  for: For;
  name: Name;
  label: string;
  validators?: InputValidator[];
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

export type FormItemGap = {
  type: 'gap';
};

export type FormItem<Name> =
  | FormItemInput<Name>
  | FormItemPassword<Name>
  | FormItemPasswordConfirmation<Name, Name>
  | FormItemCheckbox<Name>
  | FormItemButton
  | FormItemSubmit
  | FormItemGap;

export type FormLayout<Name> = (FormItem<Name> | [FormItem<Name>, FormItem<Name>])[];

/**
 * Converts form layout array type into form data type
 */
export type FormData<Layout extends FormLayout<string>, FlatLayout = FlatArray<Layout, 1>> = JoinObjectsIntersection<
  UnionToIntersection<
    FlatLayout extends { name: infer Name; type: infer Type }
      ? Name extends PropertyKey
        ? { [K in Name]: Type extends 'checkbox' ? boolean : string }
        : never
      : never
  >
>;
