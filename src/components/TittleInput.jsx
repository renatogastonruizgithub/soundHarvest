/* import { TextField } from '@mui/material' */
import React, { useState } from 'react'
import ButtonLoading from './ButtonLoading';
import axios from "axios"
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading, setResult } from '../features/globalState/globalState';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TittleInput() {
  const dispatch = useDispatch()

  const [inputValue, setInputValue] = useState("");
  const delayTimer = useRef(null);
  const api = import.meta.env.VITE_APP_API;


  const detectedPaste = (event) => {
    event.preventDefault()
    const pastedText = event.clipboardData.getData('text')
    if (pastedText) {
      const updatedValue = inputValue + pastedText
      setInputValue(updatedValue)
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
      }
      else {
        toast.error("¡Ups!, link de YouTube incorrecto", {
          autoClose: 4000,
        });
        dispatch(setLoading(false))
        dispatch(setResult([]))
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
        placeholder="Pega el link de youtube o busca el video"
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