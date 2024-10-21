import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query'; // Importa QueryClient y QueryClientProvider
import MainTemplate from './MainTemplate';

jest.mock('../organisms/AccountTable', () => () => (
    <div>
        <div>Cuenta A</div>
    </div>
));

test('renders MainTemplate with account table and form', () => {
    const queryClient = new QueryClient();

    render(
        <QueryClientProvider client={queryClient}> {}
            <MainTemplate />
        </QueryClientProvider>
    );

    const heading = screen.getByText("Manejo de Cuentas");
    const accountA = screen.getByText("Cuenta A");

    expect(heading).toBeInTheDocument();
    expect(accountA).toBeInTheDocument();
});
