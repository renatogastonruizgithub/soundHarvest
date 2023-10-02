import React from 'react'
import Images from './Images'
import Spinner from './Spinner'
import { Box } from '@mui/material'

const LoadDetailsVideo = ({ eventHandle, text, srcImage }) => {
    return (
        <>
            {eventHandle !== null ? (
                <>
                    {
                        eventHandle ? <Spinner /> : (
                            <Box>
                                <h4> {text}</h4>
                                <Images url={srcImage} alt='imagen' height={100} objectFit='contain' />
                            </Box>
                        )
                    }

                </>

            ) : null
            }

        </>
    )
}

export default LoadDetailsVideo