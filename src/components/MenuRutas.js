import React, { Component } from 'react'
export default class MenuRutas extends Component {
    render() {
        return (
            <div>
                <ul id="menurutas">
                    <li>
                        <a href="/">Home</a> |
                    </li>
                    <li>
                        <a href="/tabla/1">Tabla multiplicar 1</a> |
                    </li>
                    <li>
                        <a href="/tabla/2">Tabla multiplicar 2</a> |
                    </li>
                    <li>
                        <a href="/tabla/21">Tabla multiplicar 21</a> |
                    </li>
                    <li>
                        <a href="/noexisto">Sin ruta</a> |
                    </li>
                </ul>
            </div>
        )
    }
}