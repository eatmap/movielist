import { useForm } from 'react-hook-form';
import React, { useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Link,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';

import { register as registerUser } from '../actions/authentication';
import { showErrorMessage, showSuccessMessage } from '../utils/toast';

export default function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  const navigate = useNavigate();

  async function onSubmit(values) {
    const { username, password } = values;
    try {
      await registerUser(username, password);
      showSuccessMessage('Registration was successful. Please log in');
      navigate('/login');
    } catch (e) {
      showErrorMessage(e.message);
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} w="90%" mx="auto" mb="3">
      <FormControl isInvalid={errors.username}>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          id="username"
          placeholder="Username"
          type="text"
          {...register('username', {
            required: 'Username is required',
          })}
        />
        <FormErrorMessage>
          {errors.username && errors.username.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          placeholder="Password"
          type="password"
          {...register('password', {
            required: 'Password is required',
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.password_confirm}>
        <FormLabel htmlFor="password">Confirm Password</FormLabel>
        <Input
          id="password_confirm"
          placeholder="Confirm Password"
          type="password"
          {...register('password_confirm', {
            required: 'Password confirmation is required',
            validate: (value) =>
              value === password.current || 'Passwords do not match',
          })}
        />
        <FormErrorMessage>
          {errors.password_confirm && errors.password_confirm.message}
        </FormErrorMessage>
      </FormControl>
      <Box
        display="flex"
        alignItems="center"
        mt={4}
        justifyContent="space-between"
      >
        <Button colorScheme="messenger" isLoading={isSubmitting} type="submit">
          Submit
        </Button>
        <Link as={RouterLink} color="#0078ff" to="/login">
          Already a user?
        </Link>
      </Box>
    </Box>
  );
}
