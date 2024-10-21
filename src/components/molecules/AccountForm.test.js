import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AccountForm from './AccountForm';

const queryClient = new QueryClient();

test('renders the account form with two text fields and a button', () => {
    render(
        <QueryClientProvider client={queryClient}>
            <AccountForm />
        </QueryClientProvider>
    );
    
    const nameField = screen.getByTestId('input-name');
    const typeField = screen.getByTestId('input-type');
    const button = screen.getByText("Agregar Cuenta");

    expect(nameField).toBeInTheDocument();
    expect(typeField).toBeInTheDocument();
    expect(button).toBeInTheDocument();
});
