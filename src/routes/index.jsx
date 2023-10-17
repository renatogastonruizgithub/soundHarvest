import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from '../pages/Home'

import Downloads from '../pages/Downloads'

import SearchVideos from '../pages/SearchVideos'
function Index() {
    return (
        <BrowserRouter>

            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/busquedas' element={<SearchVideos />}></Route>
                <Route path='/descargas' element={<Downloads />}></Route>
            </Routes>

        </BrowserRouter>
    )
}

export default Index