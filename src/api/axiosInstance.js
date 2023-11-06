import axios from "axios";
let production = import.meta.env.VITE_APP_API;
let dev = import.meta.env.VITE_APP_DEV
let searchUrl = import.meta.env.VITE_APP_API2

import { toast } from 'react-toastify';

const api = axios.create({

    baseURL: dev

});
const searchApi = axios.create({
    baseURL: dev
});

// Interceptor para manejar errores de respuesta en la API de producción
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        handleResponseError(error);
        return Promise.reject(error);
    }
);
// Interceptor para manejar errores de respuesta en la API de búsqueda
searchApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Manejar errores de respuesta para la API de búsqueda
        handleResponseError(error);
        return Promise.reject(error);
    }
);

function handleResponseError(error) {
    if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
            // Manejar errores de autenticación
            toast.error(data.error);
        } else if (status === 500) {
            // Manejar errores de autorización
            toast.error(data.error);
        } else if (status === 404) {
            // Manejar errores 404
            toast.error('No se encontró la página solicitada.');
        } else {
            // Manejar otros errores
            if (data && data.error) {
                toast.error(data.error);
            } else {
                toast.error('Ocurrió un error inesperado.');
            }
        }
    } else {
        // Manejar errores de red o de solicitud
        toast.error('Ocurrió un error de red o de solicitud.');
    }
}

export { api, searchApi };