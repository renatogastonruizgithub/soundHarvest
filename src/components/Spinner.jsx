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
                display: "grid",
                placeItems: "center",
                backgroundColor: "rgb(240, 242, 245)",
                width: "100%",
                height: "100%",
                zIndex: 1000
            }}>
                <Stack sx={{
                    display: "grid",
                    placeItems: "center",
                }}>
                    <span>{title}</span>
                    <div className="loading">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </Stack>

            </Box>
        </Box>
    )
}

export default Spinner