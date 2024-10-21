import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button, Box } from '@mui/material';

const EditAccountModal = ({ open, onClose, account, onEdit, setUpdatedAccount }) => {
    const [updatedAccount, setLocalUpdatedAccount] = useState(account);

    useEffect(() => {
        setLocalUpdatedAccount(account);
    }, [account]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalUpdatedAccount({ ...updatedAccount, [name]: value });
        setUpdatedAccount({ ...updatedAccount, [name]: value });
    };

    const handleSubmit = () => {
        onEdit();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ padding: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
                <h2>Editar Cuenta</h2>
                <TextField
                    label="Nombre"
                    name="name"
                    value={updatedAccount?.name || ''}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Tipo de Cuenta"
                    name="account_type"
                    value={updatedAccount?.account_type || ''}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Saldo"
                    name="balance"
                    type="number"
                    value={updatedAccount?.balance || ''}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    margin="normal"
                    fullWidth
                />
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Guardar
                </Button>
                <Button onClick={onClose} variant="outlined" color="secondary" sx={{ marginLeft: 2 }}>
                    Cancelar
                </Button>
            </Box>
        </Modal>
    );
};

export default EditAccountModal;
