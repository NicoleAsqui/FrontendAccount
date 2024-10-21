import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import styles from '../../styles/organisms/ConfirmationModal.module.css'; 


const ConfirmationModal = ({ open, onClose, onConfirm, actionType }) => {
    const titles = {
        delete: 'Confirmar Eliminación',
        edit: 'Confirmar Edición',
    };

    const messages = {
        delete: '¿Estás seguro de que deseas eliminar esta cuenta?',
        edit: '¿Estás seguro de que deseas guardar los cambios en esta cuenta?',
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box className={styles.modalBox}>
                <Typography variant="h6" component="h2">
                    {titles[actionType]}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    {messages[actionType]}
                </Typography>
                <Box className={styles.buttonContainer}>
                    <Button variant="outlined" color="primary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color="secondary" onClick={onConfirm}>
                        Confirmar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmationModal;
