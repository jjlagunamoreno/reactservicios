import React, { Component } from 'react'
import Trabajadores from './Trabajadores'
import axios from 'axios'
import Global from '../Global'

export default class HospitalesMultiple extends Component {
    selectHospitales = React.createRef();
    state = {
        hospitales: [],
        hospitalesSeleccionados: []
    }
    loadHospitales = () => {
        let request = "api/hospitales";
        let url = Global.urlEjemplos + request;
        axios.get(url).then(response => {
            console.log("Leyendo hospitales...");
            this.setState({
                hospitales: response.data
            })
        })
    }
    componentDidMount = () => {
        this.loadHospitales();
    }
    getHospitalesSeleccionados = (e) => {
        e.preventDefault();
        let aux = [];
        let options = this.selectHospitales.current.options;
        //recorremos todos los options para recoger su id que hemos pasado
        for (var opt of options) {
            if (opt.selected == true) {
                aux.push(opt.value);
            }
            //
            this.setState({
                hospitalesSeleccionados: aux
            })
        }
    }
    render() {
        return (
            <div style={{ textAlign: "center", padding: "5%" }}>
                <h1>Hospitales Múltiple</h1>
                <hr />
                <form>
                    <select ref={this.selectHospitales} className='form-control' size='8' multiple>
                        {
                            this.state.hospitales.map((hospital, index) => {
                                return (<option key={index} value={hospital.idHospital}>
                                    {hospital.nombre}
                                </option>)
                            })
                        }
                    </select>
                    <button onClick={this.getHospitalesSeleccionados} className='btn btn-info' >Mostrar trabajadores</button>
                </form>
                <hr />
                {
                    this.state.hospitalesSeleccionados.length != 0 &&
                    (<Trabajadores idhospitales={this.state.hospitalesSeleccionados} />)
                }
            </div>
        )
    }
}
