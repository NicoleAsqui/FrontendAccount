import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Snackbar } from '@mui/material';
import Button from '../atoms/Button';
import ConfirmationModal from '../organisms/ConfirmationModal';
import EditAccountModal from '../organisms/EditAccountModal';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AccountTable = () => {
    const queryClient = useQueryClient();
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [actionType, setActionType] = useState(null);
    const [accountToDelete, setAccountToDelete] = useState(null);
    const [accountToEdit, setAccountToEdit] = useState(null);
    const [updatedAccount, setUpdatedAccount] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const { data: accounts = [], isLoading, isError } = useQuery('accounts', async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts`);
        if (!response.ok) {
            throw new Error('Error en la red al cargar las cuentas');
        }
        return response.json();
    });

    const deleteMutation = useMutation(
        (id) => fetch(`${process.env.REACT_APP_API_URL}/accounts/${id}`, { method: 'DELETE' }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('accounts');
                setOpenConfirmModal(false);
                setAccountToDelete(null);
                setActionType(null);
            },
            onError: (error) => {
                setErrorMessage(`Error al eliminar la cuenta: ${error.message}`);
                setOpenSnackbar(true);
            }
        }
    );

    const handleDeleteAccount = (id) => {
        setAccountToDelete(id);
        setActionType('delete');
        setOpenConfirmModal(true);
    };

    const handleConfirmDelete = () => {
        if (accountToDelete) {
            deleteMutation.mutate(accountToDelete);
        }
    };

    const handleEditAccount = (account) => {
        setAccountToEdit(account);
        setUpdatedAccount(account);
        setActionType('edit');
        setOpenEditModal(true);
    };

    const handleSubmitEdit = () => {
        setOpenConfirmModal(true);
    };

    const handleConfirmSaveEdit = async () => {
        if (updatedAccount) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/${updatedAccount.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedAccount),
                });
                if (!response.ok) {
                    throw new Error('Error al guardar los cambios');
                }
                queryClient.invalidateQueries('accounts');
                setOpenEditModal(false);
                setOpenConfirmModal(false);
                setAccountToEdit(null);
                setActionType(null);
            } catch (error) {
                setErrorMessage(`Error al editar la cuenta: ${error.message}`);
                setOpenSnackbar(true);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    if (isLoading) return <CircularProgress />;
    if (isError) return <p>Error al cargar las cuentas.</p>;

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Tipo de Cuenta</TableCell>
                            <TableCell>Saldo</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5}>No hay cuentas disponibles.</TableCell>
                            </TableRow>
                        ) : (
                            accounts.map(account => (
                                <TableRow key={account.id}>
                                    <TableCell>{account.id}</TableCell>
                                    <TableCell>{account.name}</TableCell>
                                    <TableCell>{account.account_type}</TableCell>
                                    <TableCell>{account.balance}</TableCell>
                                    <TableCell >
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            onClick={() => handleEditAccount(account)}>
                                            Editar
                                        </Button>
                                        <Button 
                                            variant="contained" 
                                            color="secondary" 
                                            onClick={() => handleDeleteAccount(account.id)}>
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <ConfirmationModal
                open={openConfirmModal}
                onClose={() => setOpenConfirmModal(false)}
                onConfirm={actionType === 'delete' ? handleConfirmDelete : handleConfirmSaveEdit}
                actionType={actionType}
            />
            <EditAccountModal
                open={openEditModal} 
                onClose={() => setOpenEditModal(false)}
                account={accountToEdit}
                onEdit={handleSubmitEdit}
                setUpdatedAccount={setUpdatedAccount}
            />
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default AccountTable;
