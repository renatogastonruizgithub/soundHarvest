import React from 'react'
import Images from './Images'
import Spinner from './Spinner'
import { Container, Stack, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import ButtonLoading from './ButtonLoading'
import YoutubePlayer from './YoutubePlayer'

const LoadDetailsVideo = () => {
    const { data, isLoading } = useSelector((state) => state.global)

    return (
        <>
            {data.length > 0 ?
                (<p>{data.length + " resultados encontrados"}</p>) : null
            }
            <Container maxWidth="lg" sx={{ marginTop: "2rem" }} >
                {
                    isLoading ?
                        <Spinner title="Buscando" />
                        :

                        (

                            <Grid container spacing={8}>

                                {data.map((video, index) => (

                                    <Grid item xs={12} sm={6} md={4} lg={4}>

                                        <div className='card' key={index}>
                                            <div className='cardBody'>
                                                <Stack
                                                    direction="row"
                                                    sx={{ flexDirection: { xs: "column", md: "column" } }}
                                                >


                                                    <Images url={video.thumbnail} alt='imagen' height="100%" objectFit='contain' />
                                                    <p> {video.title}</p>

                                                    <YoutubePlayer url={video.url} title={video.title} />
                                                </Stack>
                                            </div>

                                            <div className='cardActions'>
                                                <Stack direction="row"
                                                    sx={{
                                                        flexDirection: {
                                                            xs: "row",
                                                        },
                                                        justifyContent: "space-between",
                                                        alignItems: "center"
                                                    }}>
                                                    <ButtonLoading
                                                        icon={true}
                                                        nameIcon={"arrow"}

                                                        textButton={"Reproducir"}

                                                        variant={"outlined"}
                                                    />
                                                    <ButtonLoading
                                                        icon={true}
                                                        nameIcon={"arrow"}

                                                        textButton={"Descargar"}

                                                        variant={"contained"}
                                                    />
                                                </Stack>
                                            </div>
                                        </div>
                                    </Grid >

                                ))}
                            </Grid>


                        )
                }



            </Container >
        </>
    )
}

export default LoadDetailsVideo