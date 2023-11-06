import React from 'react'
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner'
import { Container, Stack, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import CardSound from './CardSound'
import ButtonLoading from './ButtonLoading'
import { chooseDownload, setAudioDownload, setVideoDownload } from '../features/globalState/globalState';


const LoadDetailsVideo = () => {
    const { input, data, isLoading, url } = useSelector((state) => state.global)
    const dispatch = useDispatch()
    const router = useNavigate();

    function goto(url) {


        dispatch(chooseDownload(url))
        dispatch(setAudioDownload(false))
        dispatch(setVideoDownload(false))
        router("/descargas")
    }

    return (
        <Container maxWidth="md" sx={{ marginTop: "2rem" }}>
            {!isLoading &&
                !url &&

                data.length > 0 ?
                (
                    <p className='span'>
                        {data.length + " resultados encontrados para " + input}
                    </p>
                ) : null
            }
            <>
                {
                    isLoading ?
                        <Spinner title="Buscando" />
                        :
                        url ?
                            (<>

                                {
                                    data.map((items, indexs) => (
                                        <Grid container spacing={8}
                                            key={indexs}
                                            sx={{
                                                ...(indexs === 0 && { display: "grid", placeItems: "center" }),
                                                marginTop: ".1rem"
                                            }}
                                        >
                                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                                <CardSound
                                                    url={items.url}
                                                    thumbnail={items.thumbnail}
                                                    title={items.title}
                                                    buttonActions={
                                                        <ButtonLoading
                                                            nameIcon="arrow"
                                                            icon={true}
                                                            textButton="Descargar"
                                                            variant="contained"
                                                            onClick={() => goto(items.url)}
                                                        />}
                                                />
                                            </Grid>
                                        </Grid>
                                    ))
                                }
                            </>
                            )
                            :
                            (
                                <Grid container spacing={8} >
                                    {data.map((video, index) => (
                                        <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                                            <CardSound
                                                url={video.url}
                                                thumbnail={video.thumbnail}
                                                title={video.title}
                                                buttonActions={
                                                    <ButtonLoading
                                                        nameIcon="arrow"
                                                        icon={true}
                                                        textButton="Descargar"
                                                        variant="contained"
                                                        onClick={() => goto(video.url)}
                                                    />}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>

                            )
                }



            </ >
        </Container >
    )
}

export default LoadDetailsVideo