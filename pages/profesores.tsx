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
import ModalErase from '../src/components/ModalErase';

const profesores = () => {

  const [modal, setModal] = useState(false);
  const data = useFetchData('profesor')
  const [deleteModal, setDeleteModal] = useState(false);
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
        <th>ID</th>
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
          <td>{profesor.id}</td>
          <td>{profesor.nombre}</td>
          <td>{profesor.fechaNacimiento}</td>
          <td>{profesor.direccionDomicilaria}</td>
          <td>{profesor.cedula}</td>
          <td>{profesor.celular}</td>
          <td>{profesor.correo}</td>
          <td><button className={buttonstyle.buttonDanger} onClick={() => setDeleteModal(!deleteModal)}>
          <p>Eliminar</p>
                  <ModalErase isOpenModal={deleteModal} handleModalClose={() => setDeleteModal(false)} >
                      <div>
                        <h1 style={{"color": "black"}}>¿Esta seguro que desea eliminar este profesor?</h1>
                        <p style={{"color": "black"}}>Nombre: {profesor.nombre}</p>
                        <button onClick={() => handleDelete(profesor.id)}>Eliminar</button>
                        <button onClick={() => setDeleteModal(false)}>Cancelar</button>
                        
                      </div>
                      
                    </ModalErase>

                </button></td>
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