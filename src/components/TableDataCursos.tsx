import React from 'react'
import { Estudiante, Curso, Asignatura, Profesor, CursosData } from '../interfaces/schema';
import styles from '../styles/table.module.css'
import button from '../styles/button.module.css'
import Link from 'next/link';
import useFetchData from '../hooks/useFetchDataEstudiante';


interface TableProps {
    data: CursosData[];
    handleDeleteCurso: (id: Number) => void;
    handleEditCurso: (id: Number) => void;
}


const TableDataEstudiante = ({ data, handleDeleteCurso, handleEditCurso }: TableProps) => {


    return (
        <>
            {data?.map((elem) => {
                return (
                    <tr key={elem.curso.id} className={styles.valuestr}>
                        <td>{elem.curso.id}</td>
                        <td>{elem.asignatura.nombre}</td>
                        <td>{elem.profesor.nombre}</td>
                        <td>{elem.curso.capacidadEstudiantes}</td>
                        <td>{elem.curso.fechaInicio}</td>
                        <td>{elem.curso.fechaFin}</td>
                        <td><button type="submit" className={button.buttonDanger} onClick={() => handleDeleteCurso(elem.curso.id)}>
                            <p>Eliminar</p>
                        </button></td>
                        <td><button className={button.buttonWarning} onClick={() => handleEditCurso(elem.curso.id)}>
                            <p>Editar</p>
                        </button></td>

                        <td>
                            <Link href={`/Cursos/[cursoId]?cursoId=${elem.curso.id}`} as={`/Cursos/${elem.curso.id}`} passHref>
                                <button className={button.buttonInfo}>
                                    <p>View Info</p>
                                </button>
                            </Link>
                        </td>



                    </tr>
                );
            })}


        </>

    )
}


export default TableDataEstudiante