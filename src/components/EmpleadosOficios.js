import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';

export default class EmpleadosOficios extends Component {
    selectOficio = React.createRef();

    state = {
        empleados: [],  // Array para almacenar los empleados
        oficios: []     // Array para almacenar los oficios únicos
    }

    // Esta función se ejecuta al cargar el componente
    componentDidMount() {
        let request = "api/empleados";
        var url = Global.urlApiEmpleados + request;
        axios.get(url).then(response => {
            // Extraemos los oficios y eliminamos los duplicados usando un Set
            const oficiosUnicos = [...new Set(response.data.map(empleado => empleado.oficio))];

            // Actualizamos el estado con los oficios únicos
            this.setState({
                oficios: oficiosUnicos
            });
        });
    }

    // Función para buscar empleados según el oficio seleccionado
    buscarEmpleados = (e) => {
        e.preventDefault();

        // Obtenemos el oficio seleccionado del <select>
        const oficioSeleccionado = this.selectOficio.current.value;
        console.log("Oficio seleccionado: " + oficioSeleccionado);

        // Construimos la URL de la API
        let request = "api/Empleados/EmpleadosOficio/" + oficioSeleccionado;
        var url = Global.urlApiEmpleados + request;

        // hacemos la petición a la api para mostrar los empleados en este oficio
        axios.get(url).then(response => {
            console.log(response.data);
            // Guardamos los empleados obtenidos en el estado
            this.setState({
                empleados: response.data
            });
        });
    }

    render() {
        return (
            <div>
                <h1>Empleados en Oficios</h1>
                <form onSubmit={this.buscarEmpleados}>
                    <label>Seleccione un oficio: </label>
                    <select ref={this.selectOficio}>
                        {
                            this.state.oficios.map((oficio, index) => (
                                <option key={index} value={oficio}>{oficio}</option>
                            ))
                        }
                    </select>
                    <button type="submit">Buscar Empleados</button>
                </form>

                <ul>
                    {/* Mostrar empleados si hay empleados en el estado */}
                    {
                        this.state.empleados.length > 0 ? (
                            this.state.empleados.map((empleado, index) => (
                                <li key={index}>
                                    <strong>ID:</strong> {empleado.idEmpleado} - <strong>Apellido:</strong> {empleado.apellido} - <strong>Salario:</strong> {empleado.salario}
                                </li>
                            ))
                        ) : (
                            <li>No se encontraron empleados para este oficio.</li>
                        )
                    }
                </ul>
            </div>
        );
    }
}
