import React, { Component } from 'react'
import axios from 'axios';
import Global from '../../Global';

export default class Empleados extends Component {
    state = {
        empleados: []
    }

    loadEmpleados = () => {
        //recuperamos el id del departamento de la clase padre con props
        let idDepartamento = this.props.iddepartamento;
        let request = "api/empleados/empleadosdepartamento/" + idDepartamento;

        var url = Global.urlApiEmpleados + request;

        axios.get(url).then(response => {
            console.log(response.data);
            this.setState({
                empleados: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadEmpleados();
    }

    render() {
        return (
            <div>
                <h3>Empleados Component ID - {this.props.iddepartamento}</h3>

                <table border="1">
                    <thead>
                        <th>Apellido</th>
                        <th>Oficio</th>
                        <th>Departamento</th>
                    </thead>
                    <tbody>
                        {
                            this.state.empleados.map((empleado, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{empleado.apellido}</td>
                                        <td>{empleado.oficio}</td>
                                        <td>{empleado.departamento}</td>
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
