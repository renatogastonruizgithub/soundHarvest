import React from 'react'
import Images from './Images'
import YoutubePlayer from './YoutubePlayer'
import { Stack } from '@mui/material'
function CardSound({ url, title, thumbnail, buttonActions }) {
    return (
        <div className='card' key={url}>
            <div className='cardBody'>

                <Stack
                    direction="row"
                    sx={{ flexDirection: { xs: "column", md: "column" } }}
                >
                    {
                        url ?
                            <YoutubePlayer url={url} title={title} /> :

                            <Images url={thumbnail} alt='imagen' height="100%" objectFit='contain' />
                    }

                    <p> {title}</p>
                </Stack>
            </div>

            <div className='cardActions'>
                {buttonActions}
            </div>
        </div>
    )
}

export default CardSound