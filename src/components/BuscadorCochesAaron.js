import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios';

export default class BuscadorCoche extends Component {
    urlApiCoches = Global.urlApiCoches;
    cajaCoche = React.createRef()
    state = {
        coches: [],
        marcaSeleccionada: null
    }

    cargarDatos = (e) => {
        e.preventDefault();
        let marcaSeleccionada = this.cajaCoche.current.value;
        let auxMarcaSeleccionada = []
        for (let i = 0; i < this.state.coches.length - 1; i++) {
            let marca = this.state.coches[i].marca
            if (marcaSeleccionada == marca) {
                auxMarcaSeleccionada.push(this.state.coches[i])
            }
        }
        this.setState({
            marcaSeleccionada: auxMarcaSeleccionada
        })
    }


    loadCoches = () => {
        console.log("component")
        let request = "webresources/coches"
        axios.get(this.urlApiCoches + request).then(response => {
            this.setState({
                coches: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadCoches();
    }

    render() {

        return (
            <div>
                <h1>Buscador de Coches</h1>
                <form onSubmit={this.cargarDatos}>
                    <label>Introduzca marca</label>
                    <input type='text' ref={this.cajaCoche}></input>
                    <button>Buscador de coches</button>
                </form>

                {
                    this.state.marcaSeleccionada &&
                    (
                        <table border={"1px"} >
                            <thead>
                                <tr>
                                    <th>Coche</th>
                                    <th>Conductor</th>
                                    <th>Imagen</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.marcaSeleccionada.map((coche, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{coche.marca} {coche.modelo}</td>
                                                <td>{coche.conductor}</td>
                                                <td><img src={coche.imagen} height={"150px"} width={"150px"}></img></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )
                }

            </div>
        )
    }
}