import React, { useEffect, useMemo, useState } from 'react';
import { FormItem, FormLayout, FormData } from '../../types/form';
import { FieldValidationResult, validateFieldValue } from '../../utils/validateField';
import { validatorPasswordConfirmation, validatorRequiredField } from '../../utils/validators';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { Input } from '../Input/Input';
import { InputPassword } from '../InputPassword/InputPassword';
import styles from './styles.css';

const getDuplicates = (itemsList: FormItem<string>[]) => {
  const names: string[] = [];
  const duplicates: string[] = [];

  for (const item of itemsList) {
    if (!('name' in item)) {
      continue;
    }

    if (names.includes(item.name)) {
      duplicates.push(item.name);
    }

    names.push(item.name);
  }

  return duplicates;
};

type Props<Layout extends FormLayout<string>> = {
  itemsLayout: Layout;
  /**
   * This flag prevents submitting data while data is
   * not valid yet and enables fields validation on change
   */
  isValidationOnChangeEnabled?: boolean;
  onSubmit?: (formData: FormData<Layout>) => void;
};

export const Form = function <Name extends string, Layout extends FormLayout<Name>>(props: Props<Layout>) {
  const itemsList = useMemo<FormItem<Name>[]>(() => props.itemsLayout.flat(), [props.itemsLayout]);

  // Checking for items duplicates
  useEffect(() => {
    const duplicates = getDuplicates(itemsList);

    if (duplicates.length > 0) {
      throw new Error(`Duplicate names in form items: ${duplicates.join(', ')}`);
    }
  }, [itemsList]);

  // List of item names with shown validation result
  const [shownValidationResults, setShownValidationResults] = useState<Name[]>([]);

  // Form values
  const [valuesMap, setValuesMap] = useState(() => {
    return itemsList.reduce((acc, item) => {
      if (!('name' in item)) {
        return acc;
      }

      if (item.type === 'checkbox') {
        return {
          ...acc,
          [item.name]: item.isDefaultChecked ?? false,
        };
      }

      if (
        item.type === 'text' ||
        item.type === 'email' ||
        item.type === 'password' ||
        item.type === 'password-confirmation'
      ) {
        return {
          ...acc,
          [item.name]: 'defaultValue' in item ? item.defaultValue : '',
        };
      }

      return acc;
    }, {} as FormData<Layout>);
  });

  // Validation results
  const validationResultMap = useMemo<Record<Name, FieldValidationResult>>(() => {
    return itemsList.reduce((acc, item) => {
      if (!('name' in item)) {
        return acc;
      }

      const value = valuesMap[item.name];

      if (typeof value === 'boolean' && item.type === 'checkbox') {
        return {
          ...acc,
          [item.name]: {
            isValid: !item.isRequired || valuesMap[item.name],
          },
        };
      }

      if (
        typeof value === 'string' &&
        (item.type === 'text' ||
          item.type === 'email' ||
          item.type === 'password' ||
          item.type === 'password-confirmation')
      ) {
        const confirmationTarget =
          item.type === 'password-confirmation' && typeof valuesMap[item.for] === 'string'
            ? (valuesMap[item.for] as string)
            : null;

        const validators = [
          ...(item.isRequired ? [validatorRequiredField] : []),
          ...(confirmationTarget ? [validatorPasswordConfirmation(confirmationTarget)] : []),
          ...(item.validators ? item.validators : []),
        ];

        const validationResult = validateFieldValue(value, validators);

        return {
          ...acc,
          [item.name]: validationResult,
        };
      }

      return acc;
    }, {} as Record<Name, FieldValidationResult>);
  }, [itemsList, valuesMap]);

  const isFormFilledValid = useMemo(() => {
    for (const item of itemsList) {
      if (!('name' in item)) {
        continue;
      }

      if (!validationResultMap[item.name].isValid) {
        return false;
      }
    }

    return true;
  }, [itemsList, validationResultMap]);

  const showValidationResult = (name: Name, isShown: boolean) => {
    setShownValidationResults((prevState) =>
      isShown
        ? [...prevState, name].filter((item, i, arr) => arr.indexOf(item) === i)
        : prevState.filter((item) => item !== name)
    );
  };

  const handleShowValidation = (name: Name) => {
    if (!props.isValidationOnChangeEnabled) {
      return;
    }

    const { isValid } = validationResultMap[name];

    showValidationResult(name, isValid != null);
  };

  const handleInputChange = (value: string, item: FormItem<Name>): FieldValidationResult | undefined => {
    if (!('name' in item)) {
      return;
    }

    setValuesMap((state) => ({
      ...state,
      [item.name]: value,
    }));

    showValidationResult(item.name, false);
  };

  const handleSubmit = () => {
    if (!props.isValidationOnChangeEnabled) {
      setShownValidationResults(
        itemsList.reduce((acc, item) => ('name' in item ? [...acc, item.name] : acc), [] as Name[])
      );
    }

    if (props.onSubmit && isFormFilledValid) {
      props.onSubmit(valuesMap);
    }
  };

  const resolveFormItem = (item: FormItem<Name>) => {
    switch (item.type) {
      case 'email':
      case 'text': {
        const value = valuesMap[item.name] as string;
        const { isValid, errorMessage } = validationResultMap[item.name];

        return (
          <Input
            type={item.type}
            value={value}
            name={item.name}
            label={item.label}
            isValidationResultShown={
              props.isValidationOnChangeEnabled
                ? shownValidationResults.includes(item.name)
                : shownValidationResults.includes(item.name) && !isValid
            }
            isValid={isValid}
            errorMessage={errorMessage}
            onChange={(value, isFocused) => {
              handleInputChange(value, item);

              if (!isFocused) {
                handleShowValidation(item.name);
              }
            }}
            onBlur={() => handleShowValidation(item.name)}
          />
        );
      }

      case 'password':
      case 'password-confirmation': {
        const value = valuesMap[item.name] as string;
        const { isValid, errorMessage } = validationResultMap[item.name];

        return (
          <InputPassword
            name={item.name}
            value={value}
            label={item.label}
            isValidationResultShown={
              item.type === 'password'
                ? shownValidationResults.includes(item.name) && !isValid
                : shownValidationResults.includes(item.name)
            }
            isValid={isValid}
            errorMessage={errorMessage}
            onChange={(value, isFocused) => {
              handleInputChange(value, item);

              if (!isFocused) {
                handleShowValidation(item.name);
              }
            }}
            onBlur={() => handleShowValidation(item.name)}
          />
        );
      }

      case 'checkbox': {
        const isChecked = valuesMap[item.name] as boolean;
        const { isValid } = validationResultMap[item.name];

        return (
          <Checkbox
            text={item.text}
            name={item.name}
            isChecked={isChecked}
            onChange={(isChecked) => {
              setValuesMap((state) => ({ ...state, [item.name]: isChecked }));

              if (props.isValidationOnChangeEnabled) {
                showValidationResult(item.name, isValid != null);
              }
            }}
          />
        );
      }

      case 'button': {
        return (
          <Button type="secondary" onClick={item.onClick} icon={item.icon}>
            {item.text}
          </Button>
        );
      }

      case 'submit': {
        return (
          <Button
            type="primary"
            onClick={handleSubmit}
            isDisabled={props.isValidationOnChangeEnabled && !isFormFilledValid}
          >
            {item.text}
          </Button>
        );
      }

      case 'gap': {
        return <div className={styles.gap} />;
      }

      default: {
        return null;
      }
    }
  };

  return (
    <div className={styles.formLayout}>
      {props.itemsLayout.map((item, i) =>
        Array.isArray(item) ? (
          <React.Fragment key={i}>
            <div className={styles.partialWidth}>{resolveFormItem(item[0])}</div>
            <div className={styles.partialWidth}>{resolveFormItem(item[1])}</div>
          </React.Fragment>
        ) : (
          <div className={styles.fullWidth} key={i}>
            {resolveFormItem(item)}
          </div>
        )
      )}
    </div>
  );
};
