import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import Layout from '../src/components/Layout'
import useFetchData from '../src/hooks/useFetchData'
import styles from '../src/styles/table.module.css'
import buttonstyle from '../src/styles/button.module.css'
import Modal from '../src/components/Modal'
import FormularioProfesores from '../src/components/FormularioProfesores';
import axios from 'axios'

const profesores = () => {

  const [modal, setModal] = useState(false);
  const data = useFetchData('profesor')

  const handleDelete = (id: Number): void => {
    axios.delete(`http://localhost:3002/profesor/${id}`)

  }


  return (
    <>
    <Layout>
    <div className={buttonstyle.button}>
        <button onClick={() => setModal(!modal)}>Agregar</button>

      </div>

    <table className={styles.tabla}>
    <thead>
      <tr className={styles.encabezado}>
        <th>Nombre</th>
        <th>Fecha de Nacimiento</th>
        <th>Direccion Domiciliaria</th>
        <th>Cedula</th>
        <th>Celular</th>
        <th>Correo</th>
      </tr>
    </thead>
    <tbody>
      {data.map(profesor => (
        <tr key={profesor.id} className={styles.valuestr}>
          <td>{profesor.nombre}</td>
          <td>{profesor.fechaNacimiento}</td>
          <td>{profesor.direccionDomicilaria}</td>
          <td>{profesor.cedula}</td>
          <td>{profesor.celular}</td>
          <td>{profesor.correo}</td>
          <td><button className={buttonstyle.buttonDanger} onClick={(e) => handleDelete(profesor.id)}>Eliminar</button></td>
        </tr>
      ))}
  </tbody>

  </table>

  <Modal isOpenModal={modal} handleModalClose={() => setModal(false)} >
          <FormularioProfesores handleModalClose={()=> setModal(false)}/>
  </Modal>

  </Layout>
  </>
  )
}

export default profesores