import { Stack } from '@mui/material'
import React, { useEffect } from 'react'

import { api } from '../api/axiosInstance.js';
import { useDispatch, useSelector } from 'react-redux';
import { clearUrl, setAudioDownload, setLoading, setVideoDownload } from '../features/globalState/globalState';
import ButtonLoading from './ButtonLoading';
import { toast } from 'react-toastify';

const ButtonsForDownload = ({ title, videoUrl }) => {
    const dispatch = useDispatch()
    const { url, isAudioDownload, isVideoDownload } = useSelector((state) => state.global)


    const dataUrl = videoUrl ?
        {
            url: videoUrl,
            mediaType: "audio"
        }
        :
        {
            url: url,
            mediaType: "audio"
        }

    const dataVideo = videoUrl ?
        {
            url: videoUrl,
            mediaType: "video"
        }
        :
        {
            url: url,
            mediaType: "video"
        }

    const getAudio = async () => {

        try {
            dispatch(setLoading(true))
            const response = await api.post("/download", dataUrl, {
                responseType: "blob"
            });
            console.log(response.request)
            if (response.status === 200) {

                const blob = new Blob([response.data], { type: 'audio/mp3' });
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.style.display = 'none'
                // Obtén la URL del archivo del objeto JSON de respuesta

                a.href = url;
                a.download = `${title}.mp3`;
                document.body.appendChild(a);
                // Hace clic en el enlace para iniciar la descarga
                a.click();
                // Limpia el objeto URL y el elemento a
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                toast.success("Audio descargado, ve a la carpeta de descargas")

                dispatch(setLoading(false))

            }
            else {

                dispatch(clearUrl());
                dispatch(setLoading(false));
            }

        } catch (error) {
            dispatch(clearUrl())
            dispatch(setLoading(false))
        }
        finally {

            dispatch(setLoading(false))
            dispatch(setAudioDownload(true))
        }
    };

    async function getVideo() {
        try {
            dispatch(setLoading(true))
            const response = await api.post("/download/mp4", dataVideo, {
                responseType: "blob"
            })

            if (response.status === 200) {
                const blob = new Blob([response.data], { type: 'video/mp4' })
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `${title}.mp4`
                a.style.display = 'none'
                document.body.appendChild(a)
                a.click()
                window.URL.revokeObjectURL(url)
                toast.success("Video descargado, ve a la carpeta de descargas")
            }
        } catch (error) {
            dispatch(clearUrl())
            dispatch(setLoading(false))
        }
        finally {

            dispatch(setLoading(false))
            dispatch(setVideoDownload(true))
        }
    }
    return (
        <>
            <Stack direction="row"
                sx={{
                    flexDirection: {
                        xs: "row",
                    },
                    justifyContent: {
                        xs: "space-between",
                        sm: "space-around",
                        md: "space-around",
                        lg: "space-around"
                    },
                    alignItems: "center"
                }}>

                <ButtonLoading
                    icon={true}
                    nameIcon="arrow"
                    onClick={getAudio}
                    textButton="Audio"
                    variant={isAudioDownload ? "outlined" : "contained"}
                />
                <ButtonLoading
                    icon={true}
                    nameIcon="arrow"
                    onClick={getVideo}
                    textButton="Video"
                    variant={isVideoDownload ? "outlined" : "contained"}
                />
            </Stack>
        </>
    )
}

export default ButtonsForDownload