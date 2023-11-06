import React from 'react'
import TittleInput from '../components/TittleInput'
import { Container, Grid, Box } from '@mui/material';
import LoadDetailsVideo from '../components/LoadDetailsVideo';
import ScrollTop from '../components/scrollTop';


function SearchVideos() {
    return (
        <>
            <Box sx={{ paddingBottom: "2rem" }}>
                <Container maxWidth="sm"  >
                    <Grid container >
                        <Grid item xs={12} md={12} lg={12} >
                            <Box>
                                <div style={{ marginBottom: "2rem" }}>
                                    <h1 className='tittleApp'>Busque su video o música favorita</h1>
                                </div>
                                <TittleInput></TittleInput>
                            </Box>
                        </Grid>
                    </Grid >
                </Container >

                <LoadDetailsVideo />
            </Box >
            <ScrollTop></ScrollTop>

        </>

    )
}

export default SearchVideos