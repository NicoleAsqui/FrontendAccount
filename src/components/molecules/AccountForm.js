import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Button from '../atoms/Button';
import TextField from '@mui/material/TextField';
import { Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import styles from '../../styles/molecules/AccountForm.module.css';

const AccountForm = () => {
    const [accountName, setAccountName] = useState('');
    const [accountType, setAccountType] = useState('');
    const [balance, setBalance] = useState('');
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newAccount) => fetch(`${process.env.REACT_APP_API_URL}/accounts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAccount),
        }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('accounts');
                setAccountName('');
                setAccountType('');
                setBalance('');
            },
            onError: (error) => {
                console.error('Error al agregar la cuenta:', error);
                alert('Error al agregar la cuenta. Asegúrate de que todos los campos sean correctos.');
            }
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!accountName || !accountType || !balance) {
            alert("Por favor, llena todos los campos.");
            return;
        }
        
        const newAccount = {
            name: accountName,
            account_type: accountType,
            balance: parseFloat(balance),
        };
        
        mutation.mutate(newAccount);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box className={styles.formContainer}>
                <TextField
                    label="Nombre de la cuenta"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    variant="outlined"
                    required
                    margin="normal"
                    className={styles.textField}
                    data-testid="input-name"
                />
                <FormControl variant="outlined" required className={styles.selectField}>
                    <InputLabel>Tipo de cuenta</InputLabel>
                    <Select
                        data-testid="input-type"
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                        label="Tipo de cuenta"
                    >
                        <MenuItem value="Ahorro">Ahorro</MenuItem>
                        <MenuItem value="Corriente">Corriente</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Saldo"
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    variant="outlined"
                    required
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary"  className={styles.textField}>
                    Agregar Cuenta
                </Button>
            </Box>
        </form>
    );
};

export default AccountForm;
