import React from 'react'
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner'
import { Container, Stack, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import CardSound from './CardSound'
import ButtonLoading from './ButtonLoading'
import { chooseDownload } from '../features/globalState/globalState';


const LoadDetailsVideo = () => {
    const { data, isLoading } = useSelector((state) => state.global)
    const dispatch = useDispatch()
    const router = useNavigate();

    function goto(url) {

        console.log(url)
        dispatch(chooseDownload(url))
        router("/descargas")
    }

    return (
        <Container maxWidth="md">
            {data.length > 0 ?
                (<p className='span'>{data.length + " resultados encontrados"}</p>) : null
            }
            <>
                {
                    isLoading ?
                        <Spinner title="Buscando" />
                        :

                        (
                            <Grid container spacing={8} >
                                {data.map((video, index) => (
                                    <Grid item xs={12} sm={6} md={4} lg={4}>
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