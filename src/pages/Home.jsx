import React, { useEffect, useState } from 'react'

import { Container, Grid, Box } from '@mui/material';
import ButtonLoading from '../components/ButtonLoading';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
const Home = () => {
    const router = useNavigate();
    const [loading, setLoading] = useState(true)
    function toGo() {
        router("/busquedas")
    }


    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)


    }, []);
    return (
        <>
            {
                loading ?
                    (
                        <div style={{
                            display: "grid", placeItems: "center", height: "100vh"
                        }} >
                            <Spinner />
                        </div >
                    )
                    :
                    <Box sx={{ paddingBottom: "2rem", display: "grid", placeItems: "center", height: "100vh" }}>

                        <Container maxWidth="md"  >
                            <Grid container  >
                                <Grid item xs={12} md={12} lg={12} >
                                    <Box>
                                        <div style={{ marginBottom: "2rem" }}>
                                            <h1 className='tittleApp'>SounDownloader</h1>
                                        </div>
                                        <div style={{ marginBottom: "2rem" }}>
                                            <h1 className='tittleApp'>Descargue el audio y videos de YouTube.</h1>
                                            <p>SounDownloader le permite convertir sus videos favoritos en formatos Mp3 y Mp4.</p>
                                        </div>
                                        <div style={{ marginBottom: "2rem" }}>
                                            <ButtonLoading
                                                icon={true}
                                                nameIcon="ir"
                                                textButton="Empezar"
                                                variant="contained"
                                                onClick={toGo}
                                            />
                                        </div>
                                    </Box>
                                </Grid>
                            </Grid >
                        </Container >
                    </Box >
            }
        </>

    )
}

export default Home