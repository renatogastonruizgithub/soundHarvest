import { TextField } from '@mui/material'
import React from 'react'


const Input = ({
    name,
    label,
    value,
    fullWidth,
    onChange,
    multiline = false || true,
    rows = Number

}) => {


    return (
        <TextField
            sx={{
                '&:focus': {
                    borderColor: 'orange', // Cambia el color de borde cuando está enfocado
                },
            }}
            name={name}
            variant="filled"
            label={label}
            value={value}
            fullWidth={fullWidth}
            onChange={onChange}
            multiline={multiline}
            rows={rows}
        />
    )
}

export default React.memo(Input) 