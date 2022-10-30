import React, { useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { PageDescription } from '../components/PageDescription/PageDescription';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { PageLayout } from '../components/PageLayout/PageLayout';
import { Text } from '../components/Text/Text';
import { Form } from '../components/Form/Form';
import { validatorEmail, validatorLatinLetters } from '../utils/validators';

export const SignUpPage = () => {
  return (
    <PageLayout>
      <PageDescription>Nice to meet you</PageDescription>
      <PageHeader>Sign Up</PageHeader>

      <Text type="secondary">
        Already have an account? <Link to="/login">Sign in</Link>
      </Text>

      <Form
        itemsLayout={[
          [
            {
              type: 'text',
              name: 'firstName',
              label: 'First name',
              isRequired: true,
              validators: [validatorLatinLetters],
            },
            {
              type: 'text',
              name: 'lastName',
              label: 'Last name',
              isRequired: true,
              validators: [validatorLatinLetters],
            },
          ],
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
            type: 'password-confirmation',
            for: 'password',
            name: 'password-confirmation',
            label: 'Password',
            isRequired: true,
          },
          {
            type: 'checkbox',
            name: 'policy',
            text: (
              <Text>
                I've read and agree with <Link to="#">Terms of Service</Link> and our <Link to="#">Privacy Policy</Link>
              </Text>
            ),
            isRequired: true,
          },
          [
            {
              type: 'submit',
              text: 'Create account',
            },
            {
              type: 'button',
              text: 'Sign up with Github',
              icon: <AiFillGithub size={20} />,
              onClick: () => {
                //
              },
            },
          ],
        ]}
      />
    </PageLayout>
  );
};
