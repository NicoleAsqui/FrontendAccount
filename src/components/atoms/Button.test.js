import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders the button with correct text', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
});
