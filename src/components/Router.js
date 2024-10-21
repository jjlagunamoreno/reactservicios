import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import TablaMultiplicar from './TablaMultiplicar'
import Home from './Home'
import NotFound from './NotFound'
import MenuRutas from './MenuRutas'

export default class Router extends Component {
    render() {
        function TablaMultiplicarElement() {
            //ESTA FUNCIÓN NOS SERVIRÁ PARA CAPTURAR LOS PARAMETROS EN UNA RUTA
            //PARA SEPARAR PROPS DE PARAMS VOY A LLAMAR A NUESTRO PARAMETRO EN RUTA minumero
            var { minumero } = useParams();
            //devolvemos el component tabla multiplicar con su props de la variable numero
            return <TablaMultiplicar numero={minumero} />
        }

        return (
            <BrowserRouter>
                <MenuRutas />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tabla/:minumero" element={<TablaMultiplicarElement />} />
                    {/* PARA LAS RUTAS QUE NO EXISTEN DEBEMOS UTILIZAR UN ASTERISCO DENTRO DEL path
                    Y DEBE SER LA ÚLTIMA ETIQUETA DE '<Routes>' */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        )
    }
}
