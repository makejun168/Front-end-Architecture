import { render, screen } from '@testing-library/react';
import App from './App';

function sum(a, b) {
  return a + b;
}

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toMatchSnapshot();
});

test('renders p element', () => {
  render(<App />);
  const linkElement = screen.getByText(/hello react\.js/i);
  expect(linkElement).toBeInTheDocument();
});

test('detect sum method exec 1 + 2', () => {
  expect(sum(1, 2)).toBe(3);
});

test('detect sum method exec "1" + "2"', () => {
  expect(sum("1", "2")).toBe("12");
});

test('detect sum method exec "NaN" + "NaN"', () => {
  expect(sum(NaN, NaN)).toBe(NaN);
});