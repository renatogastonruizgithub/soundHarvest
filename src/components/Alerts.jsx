import React, { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert';
import { Box, Snackbar } from '@mui/material';



const Alerts = ({ severity, message, onClose }) => {

    const [autoHideTimer, setAutoHideTimer] = useState(null);
    const [open, setopen] = useState(true);
    useEffect(() => {
        // Configurar un temporizador para cerrar automáticamente la alerta después de 6 segundos
        if (open) {
            const timer = setTimeout(() => {
                handleClose();
            }, 4000);
            setAutoHideTimer(timer);
        }

        return () => {
            // Limpiar el temporizador al desmontar el componente
            if (autoHideTimer) {
                clearTimeout(autoHideTimer);
            }
        };
    }, [open]);

    const handleClose = () => {
        // Cerrar la alerta y limpiar el temporizador si está activo
        if (autoHideTimer) {
            clearTimeout(autoHideTimer);
        }
        setopen(false)
    };


    return (

        <Snackbar sx={{ position: "relative !important" }} open={open} autoHideDuration={null} onClose={handleClose}>
            <Alert onClose={handleClose} variant="filled" severity={severity}>
                {message}
            </Alert>
        </Snackbar>


    )
}

export default Alerts