import React from 'react'
import { Box, Stack } from '@mui/material';
import "../assets/spinner.css"
const Spinner = ({ title }) => {
    return (
        <Box sx={{ position: "relative", margin: ".9rem 0" }}>
            <Box sx={{
                position: "absolute",
                top: "-3%",
                left: "0",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                zIndex: 1000
            }}>
                <Stack sx={{
                    display: "grid",
                    placeItems: "center",
                }}>

                    <div className="loading">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                </Stack>

            </Box>
            <p style={{ marginTop: "2rem" }}>{title}</p>
        </Box>
    )
}

export default Spinner