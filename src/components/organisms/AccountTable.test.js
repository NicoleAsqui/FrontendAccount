import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AccountTable from './AccountTable';

const queryClient = new QueryClient();

test('renders account table with account data', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve([
                { id: 1, name: 'Cuenta A', account_type: 'Ahorros', balance: 1000 },
                { id: 2, name: 'Cuenta B', account_type: 'Corriente', balance: 2000 },
            ]),
        })
    );
    
    await act(async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <AccountTable />
            </QueryClientProvider>
        );
    });

    const accountA = screen.getByText("Cuenta A");
    const accountB = screen.getByText("Cuenta B");

    expect(accountA).toBeInTheDocument();
    expect(accountB).toBeInTheDocument();
});
