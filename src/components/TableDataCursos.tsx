import React from 'react'
import { Estudiante, Curso } from '../interfaces/schema';
import styles from '../styles/table.module.css'
import button from '../styles/button.module.css'


interface TableProps {
    data: Curso[];
    handleDeleteCurso: (id: Number) => void;
    handleEditCurso: (id: Number) => void;
}



const TableDataEstudiante = ({ data, handleDeleteCurso, handleEditCurso }: TableProps) => {
    return (
        <>
            {data.map((curso: Curso) => {
                return (
                    <tr key={curso.id} className={styles.valuestr}>
                        <td>{curso.id}</td>
                        <td>{curso.idAsignatura}</td>
                        <td>{curso.idProfesor}</td>
                        <td>{curso.capacidadEstudiantes}</td>
                        <td>{curso.fechaInicio}</td>
                        <td>{curso.fechaFin}</td>
                        <td><button type="submit" className={button.buttonDanger} onClick={() => handleDeleteCurso(curso.id)}>Eliminar</button></td>
                        <td><button className={button.buttonWarning} onClick={() => handleEditCurso(curso.id)}>
                            <p>Editar</p>
                        </button></td>
                    </tr>
                );
            })}


        </>

    )
}


export default TableDataEstudiante