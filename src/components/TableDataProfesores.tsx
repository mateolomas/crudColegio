import React from 'react'
import { Estudiante, Profesor } from '../interfaces/schema';
import styles from '../styles/table.module.css'
import button from '../styles/button.module.css'


interface TableProps {
    data: Profesor[];
    handleDeleteProfesor: (id: Number) => void;
    handleEditProfesor: (id: Number) => void;
}



const TableDataProfesores = ({ data, handleDeleteProfesor, handleEditProfesor }: TableProps) => {
    return (
        <>

            {data.map(profesor => (
                <tr key={profesor.id} className={styles.valuestr}>
                    <td>{profesor.id}</td>
                    <td>{profesor.nombre}</td>
                    <td>{profesor.fechaNacimiento}</td>
                    <td>{profesor.direccionDomicilaria}</td>
                    <td>{profesor.cedula}</td>
                    <td>{profesor.celular}</td>
                    <td>{profesor.correo}</td>
                    <td><button className={button.buttonDanger} onClick={() => handleDeleteProfesor(profesor.id)}>
                        <p>Eliminar</p>
                    </button></td>
                    <td><button className={button.buttonWarning} onClick={() => handleEditProfesor(profesor.id)}>
                        <p>Editar</p>
                    </button></td>
                </tr>
            ))}
        </>

    )
}


export default TableDataProfesores