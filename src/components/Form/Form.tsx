import React, { useEffect, useMemo, useState } from 'react';
import { FormItem, FormLayout, FormData } from '../../types/form';
import { validateField } from '../../utils/validateField';
import { validatorPasswordConfirmation, validatorRequiredField } from '../../utils/validators';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { Input } from '../Input/Input';
import { InputPassword } from '../InputPassword/InputPassword';
import styles from './styles.css';

type Props<Layout extends FormLayout<string>> = {
  itemsLayout: Layout;
  onSubmit?: (formData: FormData<Layout>) => void;
};

export const Form = function <Name extends string, Layout extends FormLayout<Name>>(props: Props<Layout>) {
  // Checking for items duplicates
  useEffect(() => {
    const names: Name[] = [];

    for (const item of props.itemsLayout.flat()) {
      if (!('name' in item)) {
        continue;
      }

      if (names.includes(item.name)) {
        throw new Error(`Duplicate names in form items: "${item.name}"`);
      }

      names.push(item.name);
    }
  }, [props.itemsLayout]);

  // Form values
  const [formState, setFormState] = useState(() => {
    return props.itemsLayout.flat().reduce((acc, item) => {
      if (!('name' in item)) {
        return acc;
      }

      if (item.type === 'checkbox') {
        return {
          ...acc,
          [item.name]: item.isDefaultChecked ?? false,
        };
      }

      return {
        ...acc,
        [item.name]: 'defaultValue' in item ? item.defaultValue : '',
      };
    }, {} as FormData<Layout>);
  });

  // Validation results
  const [validationState, setValidationState] = useState(() => {
    return props.itemsLayout.flat().reduce((acc, item) => {
      if (!('name' in item)) {
        return acc;
      }

      if (item.type === 'checkbox') {
        return {
          ...acc,
          [item.name]: !item.isRequired || !item.isDefaultChecked,
        };
      }

      const defaultValue = 'defaultValue' in item && item.defaultValue ? item.defaultValue : '';
      const validators = [
        ...(item.isRequired ? [validatorRequiredField] : []),
        ...('validators' in item && item.validators ? item.validators : []),
      ];

      const errorMessage = validateField(defaultValue, validators);

      return {
        ...acc,
        [item.name]: {
          isValid: errorMessage == null,
          errorMessage,
        },
      };
    }, {} as Record<Name, { isValid: boolean; errorMessage?: string }>);
  });

  const isFormFilledValid = useMemo(() => {
    for (const item of props.itemsLayout.flat()) {
      if (!('name' in item)) {
        continue;
      }

      if (!validationState[item.name].isValid) {
        return;
      }
    }

    return true;
  }, [props.itemsLayout, validationState]);

  const handleSubmit = () => {
    if (props.onSubmit) {
      props.onSubmit(formState);
    }
  };

  const resolveFormItem = (item: FormItem<Name>) => {
    switch (item.type) {
      case 'text': {
        const value = formState[item.name] as string;
        const { isValid, errorMessage } = validationState[item.name];

        return (
          <Input
            value={value}
            label={item.label}
            isValid={isValid}
            errorMessage={errorMessage}
            onChange={(value) => {
              setFormState((state) => ({ ...state, [item.name]: value }));

              if (item.isRequired || item.validators) {
                const errorMessage = validateField(value, [
                  ...(item.isRequired ? [validatorRequiredField] : []),
                  ...(item.validators ?? []),
                ]);

                setValidationState((state) => ({
                  ...state,
                  [item.name]: {
                    isValid: errorMessage == null,
                    errorMessage,
                  },
                }));
              }
            }}
          />
        );
      }

      case 'password':
      case 'password-confirmation': {
        const value = formState[item.name] as string;
        const { isValid, errorMessage } = validationState[item.name];

        return (
          <InputPassword
            value={value}
            label={item.label}
            isValid={isValid && undefined}
            errorMessage={errorMessage}
            onChange={(value) => {
              setFormState((state) => ({ ...state, [item.name]: value }));

              if (item.isRequired || item.type === 'password-confirmation') {
                const confirmationTarget =
                  item.type === 'password-confirmation' && typeof formState[item.for] === 'string'
                    ? (formState[item.for] as string)
                    : null;

                const errorMessage = validateField(value, [
                  ...(item.isRequired ? [validatorRequiredField] : []),
                  ...(confirmationTarget ? [validatorPasswordConfirmation(confirmationTarget)] : []),
                ]);

                return setValidationState((state) => ({
                  ...state,
                  [item.name]: {
                    isValid: errorMessage == null,
                    errorMessage,
                  },
                }));
              }
            }}
          />
        );
      }

      case 'checkbox': {
        const isChecked = formState[item.name] as boolean;

        return (
          <Checkbox
            text={item.text}
            isChecked={isChecked}
            onChange={(isChecked) => {
              setFormState((state) => ({ ...state, [item.name]: isChecked }));

              if (item.isRequired) {
                setValidationState((state) => ({ ...state, [item.name]: { isValid: isChecked } }));
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
          <Button type="primary" onClick={handleSubmit} isDisabled={!isFormFilledValid}>
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
