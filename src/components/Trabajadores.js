import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global'

export default class Trabajadores extends Component {
    cajaSalario = React.createRef()
    state = {
        trabajadores: [],
        mensaje: ""
    }
    subirSalario = (e) => {
        //EVITAMOS QUE SE RECARGUE LA PÁGINA AL HACER CLICK EN EL FORMULARIO
        e.preventDefault();
        let request = "api/trabajadores/updatesalariotrabajadoreshospitales?incremento=" +
            this.cajaSalario.current.value + "&" + this.state.mensaje;

        let url = Global.urlEjemplos + request;
        axios.put(url).then(response => {
            console.log("subiendo salario...");
            this.loadTrabajadores();
        })
    }
    loadTrabajadores = () => {
        //RECUPERAR TODOS LOS IDS DE HOSPITALES
        let idsHospitales = this.props.idhospitales;
        if (idsHospitales.lenght != 0) {
            //idhospital=17&idhospital=21&idhospital=144
            let data = "";
            for (var id of idsHospitales) {
                data += "idHospital=" + id + "&";
            }
            //ELIMINAMOS EL ULTIMO CARACTER DEL STRING idhospital=25&idhospital=22&
            data = data.substring(0, data.length - 1);
            this.setState({
                mensaje: data
            })
            let request = "api/trabajadores/trabajadoreshospitales?" + data;
            let url = Global.urlEjemplos + request;
            axios.get(url).then(response => {
                console.log("leyendo trabajadores...");
                this.setState({
                    trabajadores: response.data
                })
            })
        }

    }
    componentDidMount = () => {
        this.loadTrabajadores();
    }
    //ACTUALIZA CADA VEZ QUE SE SELECCIONE UNA OPTION DIFERENTE AL DARLE AL BOTÓN
    //CAMBIANDO SUS PROPS ANTIGUAS POR LAS NUEVAS
    componentDidUpdate = (prevProps) => {
        if (prevProps.idhospitales != this.props.idhospitales) {
            this.loadTrabajadores();
        }
    }
    render() {
        return (
            <div style={{ textAlign: "center", padding: "5%" }}>
                <h2 style={{ color: 'fuchsia' }}>Trabajadores</h2>
                <div className="d-flex justify-content-center">
                    <form className="row g-3 align-items-center">
                        <div className="col-auto">
                            <label className="form-label">Subida Salarial:</label>
                            <input
                                type="text"
                                className="form-control"
                                ref={this.cajaSalario}
                                placeholder="Introduce cantidad"
                            />
                        </div>
                        <div className="col-auto">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={this.subirSalario}
                            >
                                Incrementar
                            </button>
                        </div>
                    </form>
                </div>

                <h4>Petición para: {this.state.mensaje}</h4>
                <hr></hr>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>ID Hospital</th>
                            <th>Apellido</th>
                            <th>Salario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.trabajadores.map((trabajador, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{trabajador.idHospital}</td>
                                        <td>{trabajador.apellido}</td>
                                        <td>{trabajador.salario}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        )
    }
}
