import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from './components/Login';
import Signup from './components/Signup';

test('renders login page', () => {
  const { getByPlaceholderText, getByText } = render(<Login />);
  const usernameInput = getByPlaceholderText('Username');
  const passwordInput = getByPlaceholderText('Password');
  const loginButton = getByText('Login');

  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test('login with correct credentials', () => {
  const mockLogin = jest.fn();
  const { getByPlaceholderText, getByText } = render(<Login onLogin={mockLogin} />);
  const usernameInput = getByPlaceholderText('Username');
  const passwordInput = getByPlaceholderText('Password');
  const loginButton = getByText('Login');

  fireEvent.change(usernameInput, { target: { value: 'user' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.click(loginButton);

  expect(mockLogin).toHaveBeenCalled();
});

test('login with incorrect credentials', () => {
  const mockLogin = jest.fn();
  const { getByPlaceholderText, getByText } = render(<Login onLogin={mockLogin} />);
  const usernameInput = getByPlaceholderText('Username');
  const passwordInput = getByPlaceholderText('Password');
  const loginButton = getByText('Login');

  fireEvent.change(usernameInput, { target: { value: 'invalidUser' } });
  fireEvent.change(passwordInput, { target: { value: 'invalidPassword' } });
  fireEvent.click(loginButton);

  expect(mockLogin).not.toHaveBeenCalled();
});

test('renders registration page', () => {
    const { getByPlaceholderText, getByText } = render(<Signup />);
    const emailInput = getByPlaceholderText('Email');
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const registerButton = getByText('Register');
  
    expect(emailInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });
  
  test('registers with valid input', () => {
    const mockRegister = jest.fn();
    const { getByPlaceholderText, getByText } = render(<Signup onRegister={mockRegister} />);
    const emailInput = getByPlaceholderText('Email');
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const registerButton = getByText('Register');
  
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(registerButton);
  
    expect(mockRegister).toHaveBeenCalledWith({
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123',
    });
  });
  
  test('does not register with incomplete input', () => {
    const mockRegister = jest.fn();
    const { getByText } = render(<RegistrationPage onRegister={mockRegister} />);
    const registerButton = getByText('Register');
  
    fireEvent.click(registerButton);
  
    expect(mockRegister).not.toHaveBeenCalled();
  });