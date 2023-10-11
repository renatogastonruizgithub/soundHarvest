import { useEffect, useState } from 'react'
import { Container, Grid, Box } from '@mui/material';
import './assets/App.css'
import axios from "axios"
import ButtonLoading from './components/ButtonLoading';
import LoadDetailsVideo from './components/LoadDetailsVideo';
import TittleInput from './components/TittleInput';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [url, setUrl] = useState("")
  const [visibleBtnDownload, setVisibleBtnDownload] = useState(false)
  const [visibleBtnSendUrl, setVisibleBtnSendUrl] = useState(true)
  const [data, setData] = useState({ nameFile: "", image: "" })
  const [loadingDownload, setLoadingDownload] = useState();
  const [getDatailsVideo, setGetDatailsVideo] = useState(null);
  const [downloadAgain, setDownloadAgain] = useState(false);

  const dataUrl = {
    url: url
  }

  const api = import.meta.env.VITE_APP_API;
  const dev = import.meta.env.VITE_APP_DEV;

  const handleDownlod = async () => {
    try {
      setGetDatailsVideo(true)
      const response = await axios.post(api + "/sendUrl", dataUrl)

      if (response.status === 200) {
        setVisibleBtnDownload(true)
        setVisibleBtnSendUrl(false)
        setData(response.data)
        setGetDatailsVideo(false)
      }

      else {
        toast.error("¡Ups!, link de YouTube incorrecto", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000,
        });

        setVisibleBtnDownload(false)
        setGetDatailsVideo(null)
        setUrl("")
        setData({ nameFile: "", image: "" })
      }


    } catch (error) {
      toast.error("¡Ups!, link de YouTube incorrecto", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 4000,
      });

      setVisibleBtnDownload(false)
      setGetDatailsVideo(null)
      setUrl("")
      setData({ nameFile: "", image: "" })
    }

  };

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
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000,
        });

        setLoadingDownload(false)
        setVisibleBtnDownload(false)
        setDownloadAgain(true)
      }


    } catch (error) {
      toast.error("¡Ups!,lo siento no se pudo descargar", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 4000,
      });

      setLoadingDownload(false)
      setVisibleBtnDownload(false)


    }
    finally {
      setLoadingDownload(false)
      setDownloadAgain(true)
      toast.success("¡Ya se descargo!,ve a la carpeta de descargas", {
        position: toast.POSITION.TOP_CENTER,
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
  useEffect(() => {
  }, [data])

  return (

    <Container maxWidth="sm" >
      <Grid container>
        <Grid item xs={12} md={12} lg={12}>
          <div>
            <h1 className='tittleApp'>SonudHarvest Mp3</h1>
          </div>

          <div className="card">


            <TittleInput
              eventHandle={getDatailsVideo}
              titleText={"Pega el link del video de youtube"}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <LoadDetailsVideo
              eventHandle={getDatailsVideo}
              text={data.nameFile}
              srcImage={data.image}
            />
            <Box sx={{ position: "relative !important" }}>
              <ToastContainer />

            </Box>

            {
              visibleBtnSendUrl &&
              <ButtonLoading
                icon={true}
                loading={getDatailsVideo}
                variant={"contained"}
                onClick={handleDownlod}
                textButton={"Verificar link"}
                textLoading={"Cargando datos del video"}
              />
            }


            {
              visibleBtnDownload &&

              <ButtonLoading
                icon={true}
                loading={loadingDownload}
                nameIcon={"arrow"}
                onClick={getDownlod}
                textButton={downloadAgain ? "Descargar de nuevo" : "Descargar"}
                textLoading={"Convirtiendo a mp3"}
                variant={downloadAgain ? "outline" : "contained"}

              />
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

            }



          </div>
        </Grid>
      </Grid >

    </Container >

  )
}

export default App
