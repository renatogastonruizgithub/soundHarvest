import { useEffect, useState } from 'react'
import { Container, Grid, Box } from '@mui/material';
import './assets/App.css'

import LoadDetailsVideo from './components/LoadDetailsVideo';
import TittleInput from './components/TittleInput';





function App() {
  /*  const [url, setUrl] = useState("")
   const [visibleBtnDownload, setVisibleBtnDownload] = useState(false)
   const [visibleBtnSendUrl, setVisibleBtnSendUrl] = useState()
   const [data, setData] = useState({ nameFile: "", image: "" })
   const [loadingDownload, setLoadingDownload] = useState();
   const [getDatailsVideo, setGetDatailsVideo] = useState(null);
   const [downloadAgain, setDownloadAgain] = useState(false);
 
   const dataUrl = {
     url: url
   }
 
   const api = import.meta.env.VITE_APP_API;
   const dev = import.meta.env.VITE_APP_DEV;
 
 
   const getDownlod = async () => {
 
     try {
       setLoadingDownload(true)
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
         a.download = `${data.nameFile}.mp3`;
         document.body.appendChild(a);
         // Hace clic en el enlace para iniciar la descarga
         a.click();
         // Limpia el objeto URL y el elemento a
         window.URL.revokeObjectURL(url);
         document.body.removeChild(a);
 
       }
       else {
         toast.error("¡Ups!,lo siento no se pudo descargar", {
           autoClose: 4000,
         });
 
         setLoadingDownload(false)
         setVisibleBtnDownload(false)
         setDownloadAgain(true)
       }
 
 
     } catch (error) {
       toast.error("¡Ups!,lo siento no se pudo descargar", {
         autoClose: 4000,
       });
 
       setLoadingDownload(false)
       setVisibleBtnDownload(false)
 
 
     }
     finally {
       setLoadingDownload(false)
       setDownloadAgain(true)
       toast.success("¡Ya se descargo!,ve a la carpeta de descargas", {
         autoClose: 4000,
       });
     }
   };
 
   const againDownload = () => {
     setGetDatailsVideo(null)
     setVisibleBtnDownload(false)
     setVisibleBtnSendUrl(true)
     setUrl("")
     setData({ nameFile: "", image: "" })
     setLoadingDownload(null)
     setDownloadAgain(false)
   }
 
   function returnHome() {
     window.location.reload();
   }
 
   useEffect(() => {
   }, [data]) */

  return (
    <Box /* sx={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", position: "relative" }} */>

      <Container maxWidth="sm"  >
        <Grid container >
          <Grid item xs={12} md={12} lg={12} >
            <Box>
              <div>
                <h1 className='tittleApp'>SonudHarvest Mp3</h1>
              </div>
              <TittleInput
              />
            </Box>


            {/* 
              {
                visibleBtnDownload &&
                <>

                  <ButtonLoading
                    icon={true}
                    loading={loadingDownload}
                    nameIcon={"arrow"}
                    onClick={getDownlod}
                    textButton={downloadAgain ? "Descargar de nuevo" : "Descargar"}
                    textLoading={"Convirtiendo a mp3"}
                    variant={downloadAgain ? "outline" : "contained"}
                  />
                  {
                    downloadAgain ? " " : <ButtonLoading
                      icon={true}
                      loading={false}
                      nameIcon={"west"}
                      onClick={returnHome}
                      textButton={"Volver"}
                      variant={"outline"}
                    />
                  }

                </>

              }
              {
                downloadAgain ? <ButtonLoading
                  icon={true}
                  nameIcon={"retry"}
                  loading={false}
                  textButton={"Descargar otro"}
                  variant={"contained"}
                  onClick={againDownload}
                /> : null

              } */}


          </Grid>
        </Grid >
      </Container >
      <LoadDetailsVideo />
    </Box >
  )
}

export default App
