/* eslint-disable */
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders app', () => {
  render(<App />);
  const header = screen.getByText(/Todos/);
  expect(header).toBeInTheDocument();
});
