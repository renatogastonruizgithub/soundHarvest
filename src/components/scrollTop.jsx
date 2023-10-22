import styles from "../assets/scrollTop.module.scss";
import { useEffect, useState } from 'react';
import NorthIcon from '@mui/icons-material/North';
import { IconButton } from "@mui/material";

const ScrollTop = () => {

    const [scroll, setScroll] = useState(false)

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {

            if (window.pageYOffset > 1000) {
                setScroll(true)

            } else {
                setScroll(false)
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {scroll &&

                <div className={styles.containerTop} >
                    <IconButton onClick={handleClick} >
                        <NorthIcon sx={{ color: "#fff" }} />
                    </IconButton>
                </div>
            }

        </>
    )
}
export default ScrollTop