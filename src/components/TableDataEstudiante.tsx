import React from 'react'
import { Estudiante } from '../interfaces/schema'
import styles from '../styles/table.module.css'
import button from '../styles/button.module.css'


interface TableProps {
  data: Estudiante[];
  handleDeleteEst: (id: Number) => void;
  handleEditEst: (id: Number) => void;

}

const TableDataEstudiante = ({ data, handleDeleteEst, handleEditEst }: TableProps) => {
  return (
    <>
      {data.map(estudiante => (
        <tr key={estudiante.id} className={styles.valuestr}>
          <td>{estudiante.id}</td>
          <td>{estudiante.nombre}</td>
          <td>{estudiante.fechaNacimiento}</td>
          <td>{estudiante.direccionDomiciliaria}</td>
          <td>{estudiante.cedula}</td>
          <td>{estudiante.nombreRepresentante}</td>
          <td>{estudiante.celularRepresentante}</td>
          <td><button className={button.buttonDanger} onClick={() => handleDeleteEst(estudiante.id)}>
            <p>Eliminar</p>
          </button></td>
          <td><button className={button.buttonWarning} onClick={() => handleEditEst(estudiante.id)}>
            <p>Editar</p>
          </button></td>
        </tr>

      ))}
    </>

  )
}


export default TableDataEstudiante