
import React, { useState } from 'react'
import axios from "axios"
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading, setResult, setUrl } from '../features/globalState/globalState';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../assets/index.css"


function TittleInput() {
  const dispatch = useDispatch()

  const [inputValue, setInputValue] = useState("");
  const delayTimer = useRef(null);
  const api = import.meta.env.VITE_APP_API;


  const detectedPaste = async (event) => {
    event.preventDefault()

    const pastedText = event.clipboardData.getData('text')
    if (pastedText) {
      const updatedValue = inputValue + pastedText
      setInputValue(updatedValue)
      dispatch(setUrl(updatedValue)) //envio la url para poder descargar
      if (delayTimer.current) {
        clearTimeout(delayTimer.current)
      }
      delayTimer.current = setTimeout(() => {
        getVerify(updatedValue)
      }, 500)
    }
  }


  const handleSearch = (event) => {
    const value = event.target.value
    setInputValue(value)
    if (delayTimer.current) {
      clearTimeout(delayTimer.current)
    }
    delayTimer.current = setTimeout(() => {

      searchApi(value);

    }, 1000)
  };


  const searchApi = async (query) => {
    dispatch(setLoading(true))
    try {
      const response = await axios.post(api + "/search", { query })
      dispatch(setResult(response.data))
      dispatch(setLoading(false))
      setInputValue("")
    } catch (error) {
      toast.error("¡Ups!, no encontrado", {
        autoClose: 4000,
      });
      dispatch(setLoading(false))
      console.error(error);
    }
  };

  const getVerify = async (url) => {

    try {
      dispatch(setLoading(true))
      const response = await axios.post(api + "/sendUrl", { url })

      if (response.status === 200) {
        dispatch(setResult([response.data]))
        dispatch(setLoading(false))
        setInputValue("")
      }
      else {
        toast.error("¡Ups!, link de YouTube incorrecto", {
          autoClose: 4000,
        });
        dispatch(setLoading(false))
        dispatch(setResult([]))
        setInputValue("")
      }


    } catch (error) {
      toast.error("¡Ups!, link de YouTube incorrecto", {
        autoClose: 4000,
      });
      dispatch(setLoading(false))
      dispatch(setResult([]))
    }
  };


  return (

    <div>

      <input type="text"
        value={inputValue}
        id='MyInput'
        className="MyInput"
        placeholder="Pegue el link de youtube o busque el video"
        onInput={handleSearch}
        onPaste={detectedPaste}
      />


      <ToastContainer
        position={window.innerWidth < 768 ? "bottom-center" : "top-center"}
      />

    </div>
  )
}

export default TittleInput