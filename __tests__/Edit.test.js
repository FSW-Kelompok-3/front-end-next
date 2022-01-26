/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import Edit from '../components/logicEdit';

test('renders Edit', () => {
  render(<Edit />);
  const EditPlayer = screen.getByText(/Edit Player/i);
  expect(EditPlayer).toBeInTheDocument();
});
