/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import { FormErrors } from '../components/FormErrors';

describe('Validasi untuk form edit Profile', () => {
  test('renders username required', () => {
    render(<FormErrors formErrors={{
      username: ' required', password: '', email: '', nama: '', umur: '',
    }}
    />);
    const username = screen.getByText('username required');
    expect(username).toBeInTheDocument();
  });

  test('renders email is invalid format', () => {
    render(<FormErrors formErrors={{
      username: '', password: '', email: ' is invalid format', nama: '', umur: '',
    }}
    />);
    const username = screen.getByText('email is invalid format');
    expect(username).toBeInTheDocument();
  });

  test('renders password is too short', () => {
    render(<FormErrors formErrors={{
      username: '', password: ' is too short', email: '', nama: '', umur: '',
    }}
    />);
    const username = screen.getByText('password is too short');
    expect(username).toBeInTheDocument();
  });

  test('renders nama is required', () => {
    render(<FormErrors formErrors={{
      username: '', password: '', email: '', nama: ' is required', umur: '',
    }}
    />);
    const username = screen.getByText('nama is required');
    expect(username).toBeInTheDocument();
  });

  test('renders umur is invalid format', () => {
    render(<FormErrors formErrors={{
      username: '', password: '', email: '', nama: ' is too short', umur: 'is invalid format',
    }}
    />);
    const username = screen.getByText('umur is invalid format');
    expect(username).toBeInTheDocument();
  });

  test('renders validation without error', () => {
    render(<FormErrors formErrors={{
      username: '', password: '', email: '', nama: '', umur: '',
    }}
    />);
  });
});
