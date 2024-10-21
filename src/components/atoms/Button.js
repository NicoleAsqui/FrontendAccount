import React from 'react';
import ButtonMUI from '@mui/material/Button';

const Button = ({ children, ...props }) => {
    return (
        <ButtonMUI {...props}>
            {children}
        </ButtonMUI>
    );
};

export default Button;
