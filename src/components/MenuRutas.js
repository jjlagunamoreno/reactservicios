import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class MenuRutas extends Component {
    render() {
        return (
            <div>
                <ul id="menurutas">
                    <li>
                        <NavLink to="/">Home</NavLink> |
                    </li>
                    <li>
                        <NavLink to="/tabla/1">Tabla multiplicar 1</NavLink> |
                    </li>
                    <li>
                        <NavLink to="/tabla/2">Tabla multiplicar 2</NavLink> |
                    </li>
                    <li>
                        <NavLink to="/tabla/21">Tabla multiplicar 21</NavLink> |
                    </li>
                    <li>
                        <NavLink to="/noexisto">Sin ruta</NavLink> |
                    </li>
                </ul>
            </div>
        )
    }
}