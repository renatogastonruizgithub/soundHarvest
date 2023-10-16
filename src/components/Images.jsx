import { Skeleton } from '@mui/material'
import React, { useState, useEffect } from 'react'


const Images = ({ url, alt = "", height, objectFit = "cover" || "contain" }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.onload = () => {
            setIsLoaded(true);
        };
        image.onerror = () => {
            setIsLoaded(false);
        };

        image.src = url;
        return () => {
            // Cancelar la carga de la imagen si el componente se desmonta antes de que se haya cargado
            image.onload = null;
            image.onerror = null;
        };
    }, [])

    return (
        <>
            {
                isLoaded ?

                    (<img src={url} alt={alt} style={{ width: "100%", height: height, objectFit: objectFit, borderRadius: "17px" }} />)
                    :
                    (<Skeleton variant="rectangular" height={height} sx={{ width: "100%" }} />)
            }

        </>
    )
}

export default Images