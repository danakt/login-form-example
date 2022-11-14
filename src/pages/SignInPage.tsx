import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Form } from '../components/Form/Form';
import { PageDescription } from '../components/PageDescription/PageDescription';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { PageLayout } from '../components/PageLayout/PageLayout';
import { Text } from '../components/Text/Text';
import { validatorEmail } from '../utils/validators';

export const SignInPage = () => {
  return (
    <PageLayout>
      <PageDescription>Welcome back</PageDescription>
      <PageHeader>Sign in</PageHeader>

      <Text type="secondary">
        Don't have an account? <Link to="/">Sign up</Link>
      </Text>

      <Form
        itemsLayout={[
          {
            type: 'text',
            name: 'email',
            label: 'Email',
            isRequired: true,
            validators: [validatorEmail],
          },
          {
            type: 'password',
            name: 'password',
            label: 'Password',
            isRequired: true,
          },
          {
            type: 'gap',
          },
          [
            {
              type: 'submit',
              text: 'Sign in',
            },

            {
              type: 'button',
              text: 'Sign in with Github',
              icon: <AiFillGithub size={20} />,
              onClick: () => {
                //
              },
            },
          ],
        ]}
        onSubmit={(data) => {
          console.log({
            ...data,
            password: data.password.replace(/./g, '*'),
          });
        }}
      />
    </PageLayout>
  );
};
