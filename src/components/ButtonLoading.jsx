import LoadingButton from '@mui/lab/LoadingButton/LoadingButton'
import React from 'react'
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ButtonLoading = ({ nameIcon, variant, icon, textButton, loading, textLoading, onClick }) => {
    const IconComponent = nameIcon === 'retry' ? ReplayIcon : nameIcon === 'arrow' ? ArrowDownwardIcon : CheckCircleIcon;


    return (

        <LoadingButton
            sx={{ marginTop: "2rem" }}
            className='button'
            type="submit"
            endIcon={icon ? <IconComponent /> : null}
            loading={loading}
            loadingPosition={icon ? "end" : undefined}
            variant={variant}
            onClick={onClick}
        >
            {
                loading ?
                    (
                        <span style={{ textTransform: "lowercase" }}>{textLoading}...</span>
                    )
                    : <span>{textButton}</span>

            }
        </LoadingButton>

    )
}

export default React.memo(ButtonLoading)