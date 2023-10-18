import React from 'react'
import LoadDetailsVideo from '../components/LoadDetailsVideo'
import { Box, Button, Container, Grid } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'
import CardSound from '../components/CardSound'
import ButtonsForDownload from '../components/ButtonsForDownload'
import Spinner from '../components/Spinner'
import { ToastContainer } from 'react-toastify'
import ButtonLoading from '../components/ButtonLoading'
import { useNavigate } from 'react-router-dom';
import { clearData } from '../features/globalState/globalState'
const Downloads = () => {
    const { dataChoose, isLoading, isAudioDownload, isVideoDownload } = useSelector((state) => state.global)
    const router = useNavigate();
    const dispatch = useDispatch()
    function goTo() {
        dispatch(clearData())


        router("/busquedas")

    }

    function back() {

        router("/busquedas")
    }

    return (
        <Box sx={{ paddingBottom: "2rem" }}>
            <Container maxWidth="sm"  >
                <Grid container >
                    <Grid item xs={12} md={12} lg={12} >
                        <Box>
                            <div style={{ marginBottom: "2rem" }}>
                                <h1 className='tittleApp'>Elije que quieres descargar</h1>
                            </div>

                        </Box>
                    </Grid>
                </Grid >
            </Container >
            <Container maxWidth="md" sx={{ marginTop: "2rem" }}>
                {
                    isLoading ?
                        <Spinner title="Descargando" />
                        :

                        <Grid container spacing={8} sx={{ display: "grid", placeItems: "center" }} >

                            {dataChoose.map((video, index) => (
                                <Grid item xs={12} sm={5} md={5} lg={5}>

                                    {isAudioDownload || isVideoDownload ?
                                        <ButtonLoading
                                            textButton="Buscar otro"
                                            icon={true}
                                            nameIcon="west"
                                            variant="outline"
                                            onClick={goTo}
                                        />
                                        :
                                        (
                                            <div style={{ marginBottom: "2rem" }}>
                                                <ButtonLoading
                                                    textButton="Volver"
                                                    icon={true}
                                                    nameIcon="west"
                                                    variant="outlined"
                                                    onClick={back}
                                                />
                                            </div>



                                        )
                                    }

                                    {isAudioDownload &&
                                        <p>Audio descargado</p>

                                    }

                                    <CardSound

                                        url={video.url}
                                        thumbnail={video.thumbnail}
                                        title={video.title}
                                        buttonActions={
                                            <ButtonsForDownload
                                                title={video.title}
                                                videoUrl={video.url}
                                            />
                                        }
                                    />
                                </Grid>
                            ))}
                        </Grid>
                }
            </Container>
            <ToastContainer
                position={window.innerWidth < 768 ? "bottom-center" : "top-center"}
            />
        </Box >

    )
}

export default Downloads