import React from 'react';
import { Box } from '@mui/material';
import AccountForm from '../molecules/AccountForm';
import AccountTable from '../organisms/AccountTable';
import styles from '../../styles/templates/MainTemplate.module.css';

const MainTemplate = () => {
    return (
        <Box className={styles.container}>
            <Box className={styles.box}>
                <h1>Manejo de Cuentas</h1>
                <AccountForm />
                <AccountTable />
            </Box>
        </Box>
    );
};

export default MainTemplate;
