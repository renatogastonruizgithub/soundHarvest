import { TextField } from '@mui/material'
import React from 'react'

function TittleInput({ eventHandle, onChange, value, titleText }) {
  return (
    <>
      {
        eventHandle == false ? null : (
          <>
            <p>
              {titleText}
            </p>

            <TextField
              id="standard-basic"
              variant="standard"
              fullWidth={true}
              value={value}
              onChange={onChange}
            />
          </>
        )
      }

    </>
  )
}

export default TittleInput