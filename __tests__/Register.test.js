/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import Register from '../components/registerForm';

test('renders Register', () => {
  render(<Register />);
  const RegisterPlayer = screen.getByText(/Sign Up/i);
  expect(RegisterPlayer).toBeInTheDocument();
});
