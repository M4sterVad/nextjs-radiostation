import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './Searchbar';
import '@testing-library/jest-dom';

describe('SearchBar Component', () => {
  it('renders the search bar', () => {
    render(<SearchBar onSearch={jest.fn()} />);

    const inputElement = screen.getByPlaceholderText(/Search for a station/i);
    expect(inputElement).toBeInTheDocument();
  });

  it('calls the onSearch function when the input value changes', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText(/Search for a station/i);

    // Simulate typing in the input
    fireEvent.change(inputElement, { target: { value: 'New station' } });

    // Check if onSearch was called with the correct argument
    expect(mockOnSearch).toHaveBeenCalledWith('New station');
  });

  it('updates the input value when user types', () => {
    render(<SearchBar onSearch={jest.fn()} />);

    const inputElement = screen.getByPlaceholderText(/Search for a station/i);

    // Simulate typing in the input
    fireEvent.change(inputElement, { target: { value: 'New station' } });

    // Check if the input value has been updated
    expect(inputElement).toHaveValue('New station');
  });
});
