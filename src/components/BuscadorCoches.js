import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';

export default class BuscadorCoches extends Component {
    //declaramos una variable para guardar la marca de los coches
    cajaMarca = React.createRef();

    //guardamos la url de la api que vamos a utilizar para extraer los datos
    urlApi = Global.urlApiCoches;
    request = this.urlApi + "webresources/coches";

    //estado para guardar los coches encontrados con array para almacenar los coches que se encuentran
    state = {
        coches: []
    };

    //declaramos función para buscar marcas de los coches
    buscarMarcas = (e) => {
        //utilizamos este método para evitar recargar de nuevo la página
        e.preventDefault();

        //guardamos en una variable los valores que nos han pasado en la caja para saber la marca
        //normalizamos el input del usuario
        let marcaCoche = this.cajaMarca.current.value.trim().toLowerCase();
        console.log("La marca recogida es: " + marcaCoche);

        //probamos a acceder a la información de la api a través del request
        axios.get(this.request)
            .then(response => {
                console.log("Datos JSON recibidos:", response.data);

                //filtramos los coches por la marca introducida (ignoramos mayúsculas y minúsculas)
                let cochesFiltrados = response.data.filter(coche => coche.marca.toLowerCase() === marcaCoche);

                if (cochesFiltrados.length > 0) {
                    //actualizamos el estado con los coches encontrados
                    this.setState({ coches: cochesFiltrados });
                    console.log(`Coches encontrados de la marca ${marcaCoche}:`, cochesFiltrados);
                } else {
                    console.log("No se encontraron coches de esa marca.");
                    this.setState({ coches: [] });
                }

            })
            .catch(error => {
                console.error("Error al acceder a los datos JSON:", error);
            });
    }

    //pintamos la web
    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <h1>BuscadorCoches</h1>

                <form>
                    <label>Introduzca marca: </label>
                    <input type="text" ref={this.cajaMarca} />
                    <button onClick={this.buscarMarcas}>Buscar coches</button>
                </form>

                {/* mostramos los datos que queremos mostrar al usuario en esta tabla */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <table border="1px" className='table table-danger'>
                        <thead>
                            <th>Modelo</th>
                            <th>Conductor</th>
                            <th>Imagen</th>
                        </thead>
                        <tbody>
                            {this.state.coches.length > 0 ? (
                                this.state.coches.map((coche, index) => (
                                    <tr key={index}>
                                        <td>{coche.modelo}</td>
                                        <td>{coche.conductor}</td>
                                        <td><img src={coche.imagen} alt={coche.modelo} style={{ width: '100px', height: '100px' }} /></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No se encontraron coches.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
