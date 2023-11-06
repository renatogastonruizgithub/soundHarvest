
import React, { useState, useEffect } from 'react'
import { api, searchApi } from '../api/axiosInstance.js';
import { useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearData, setInputValues, setLoading, setResult, setUrl } from '../features/globalState/globalState';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../assets/index.css"


function TittleInput() {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)

  const { input } = useSelector((state) => state.global)


  const delayTimer = useRef(null);
  const abortController = useRef(new AbortController())


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
            search(value);
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
        search(value);
      }
      else {
        dispatch(setInputValues(""))
        dispatch(clearData())
      }

    }, 1000);
  }, []);


  const search = async (query) => {
    dispatch(setLoading(true))
    try {
      const signal = abortController.current.signal;
      const response = await searchApi.post("/search", { query }, { signal })
      if (!signal.aborted) {

        if (response.status === 200) {
          dispatch(setUrl(""))
          dispatch(setResult(response.data))
          dispatch(setLoading(false))

        }
        else {
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
      const response = await searchApi.post("/checkLink", { url })

      if (response.status === 200) {
        dispatch(setResult([response.data]))
        dispatch(setLoading(false))
        dispatch(setInputValues(""))
      }
      else {
        dispatch(setLoading(false))
        dispatch(setResult([]))
        dispatch(setInputValues(""))
      }

    } catch (error) {
      dispatch(setLoading(false))
      dispatch(setResult([]))
      dispatch(setInputValues(""))
    }
  };


  useEffect(() => {
    // Manejar el evento de desplazamiento
    const handleScroll = () => {
      if (window.scrollY > 180) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Eliminar el event listener cuando se desmonta el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])



  return (

    <div className={`navbar ${isScrolled ? 'fixed' : ''}`}>

      <input type="text"
        autoComplete="off"
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