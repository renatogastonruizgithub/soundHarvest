import { Stack } from '@mui/material'
import React, { useEffect } from 'react'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearUrl, setAudioDownload, setLoading } from '../features/globalState/globalState';
import ButtonLoading from './ButtonLoading';

const ButtonsForDownload = ({ title, videoUrl }) => {
    const dispatch = useDispatch()
    const { url, isAudioDownload, isVideoDownload } = useSelector((state) => state.global)
    const api = import.meta.env.VITE_APP_API;

    const dataUrl = videoUrl ? { url: videoUrl } : { url: url };

    const getAudio = async () => {

        try {
            dispatch(setLoading(true))
            const response = await axios.post(api + "/downloads", dataUrl, {
                responseType: "blob"
            });

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
                dispatch(clearUrl())
                dispatch(setLoading(false))

            }
            else {
                toast.error("¡Ups!,lo siento no se pudo descargar", {
                    autoClose: 4000,
                });
                dispatch(clearUrl())
                dispatch(setLoading(false))
            }


        } catch (error) {
            toast.error("¡Ups!,lo siento no se pudo descargar", {
                autoClose: 4000,
            });
            dispatch(clearUrl())
            dispatch(setLoading(false))
        }
        finally {

            toast.success("¡Ya se descargo!,ve a la carpeta de descargas", {
                autoClose: 4000,
            });
            dispatch(clearUrl())
            dispatch(setLoading(false))
            dispatch(setAudioDownload(true))
        }
    };

    function getVideo() {
        toast.info("Funcionalidad un no disponible", {
            autoClose: 4000,
        });
        return
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