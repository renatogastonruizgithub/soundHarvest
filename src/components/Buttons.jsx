import { Button } from '@mui/material'
import React from 'react'

const Buttons = ({ linkComponent, textButton, onClick, variant = "contained" || "outlined", startIcon }) => {
    return (
        <>
            <Button
                variant={variant}
                startIcon={startIcon}
                onClick={onClick}
            >
                {textButton}
                {linkComponent}
            </Button>
        </>
    )
}

export default React.memo(Buttons) 