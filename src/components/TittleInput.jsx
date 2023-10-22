
import React, { useState } from 'react'
import axios from "axios"
import { useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearData, setInputValues, setLoading, setResult, setUrl } from '../features/globalState/globalState';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../assets/index.css"


function TittleInput() {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState("");
  const { input } = useSelector((state) => state.global)


  const delayTimer = useRef(null);
  const api = import.meta.env.VITE_APP_API;
  const abortController = useRef(new AbortController());


  const detectedPaste = async (event) => {
    event.preventDefault()
    const youtubeUrl = "https://www.youtube.com/";
    const pastedText = event.clipboardData.getData('text')

    if (pastedText) {

      if (pastedText.includes(youtubeUrl)) {
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
      else {
        const value = pastedText
        setInputValue(value)
        if (delayTimer.current) {
          clearTimeout(delayTimer.current);
          abortController.current.abort();
          abortController.current = new AbortController();
        }


        delayTimer.current = setTimeout(() => {
          if (value.trim() !== '') {
            dispatch(setInputValues(value))
            searchApi(value);
          }
          else {
            dispatch(setInputValues(""))
            dispatch(clearData())
          }

        }, 1000);
      }
    }

  }


  const handleSearch = useCallback((event) => {
    const value = event.target.value;

    setInputValue(value)


    if (delayTimer.current) {
      clearTimeout(delayTimer.current);
      abortController.current.abort();
      abortController.current = new AbortController();
    }


    delayTimer.current = setTimeout(() => {
      if (value.trim() !== '') {
        dispatch(setInputValues(value))
        searchApi(value);
      }
      else {
        dispatch(setInputValues(""))
        dispatch(clearData())
      }

    }, 1000);
  }, []);


  const searchApi = async (query) => {
    dispatch(setLoading(true))
    try {
      const signal = abortController.current.signal;
      const response = await axios.post(api + "/search", { query }, { signal })
      if (!signal.aborted) {

        if (response.status === 200) {
          dispatch(setUrl(""))
          dispatch(setResult(response.data))
          dispatch(setLoading(false))

        }
        else {
          toast.error("¡Ups!, no encontrado", {
            autoClose: 4000,
          });
          dispatch(setLoading(false))
          dispatch(setUrl(""))
        }

      }

    } catch (error) {

      dispatch(setLoading(false))

      throw new Error(error)

    }
  };

  const getVerify = async (url) => {

    try {
      dispatch(setLoading(true))
      const response = await axios.post(api + "/sendUrl", { url })

      if (response.status === 200) {
        dispatch(setResult([response.data]))
        dispatch(setLoading(false))
        dispatch(setInputValues(""))
      }
      else {
        toast.error("¡Ups!, link de YouTube incorrecto", {
          autoClose: 4000,
        });
        dispatch(setLoading(false))
        dispatch(setResult([]))
        dispatch(setInputValues(""))
      }


    } catch (error) {
      toast.error("¡Ups!, link de YouTube incorrecto", {
        autoClose: 4000,
      });
      dispatch(setLoading(false))
      dispatch(setResult([]))
      dispatch(setInputValues(""))
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