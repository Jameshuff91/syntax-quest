import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const heading = screen.getByText(/Welcome to Syntax Quest!/i);
  const description = screen.getByText(/Embark on a journey to master JavaScript/i);
  const button = screen.getByText(/Start Your Adventure/i);
  
  expect(heading).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});
