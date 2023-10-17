import LoadingButton from '@mui/lab/LoadingButton/LoadingButton'
import React from 'react'
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WestIcon from '@mui/icons-material/West';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const ButtonLoading = ({ nameIcon, variant, icon, textButton, loading, textLoading, onClick }) => {
    const IconComponent =
        nameIcon === 'retry' ? ReplayIcon :
            nameIcon === 'arrow' ? ArrowDownwardIcon :
                nameIcon === 'west' ? WestIcon :
                    nameIcon === 'ir' ? ArrowForwardIcon :
                        CheckCircleIcon;
    return (

        <LoadingButton
            sx={{ color: "#fff", borderRadius: "17px", backgroundColor: "#242424", textTransform: "capitalize", fontSize: ".9rem" }}
            /*   className='button' */
            type="submit"
            startIcon={icon ? <IconComponent /> : null}
            loading={loading}
            /*   loadingPosition={icon ? "end" : undefined} */
            variant={variant}
            onClick={onClick}
            size='small'
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