import Link from 'next/link'
import React from 'react'
import FormularioEstudiantes from '../src/components/FormularioEstudiantes';
import Layout from '../src/components/Layout'
import useFetchData from '../src/hooks/useFetchData'
import styles from '../src/styles/table.module.css'
import buttonstyle from '../src/styles/button.module.css'
import { useState } from 'react'
import Modal from '../src/components/Modal'
import axios from 'axios'
import ModalErase from '../src/components/ModalErase';

const estudiantes = () => {

  const data = useFetchData("estudiante");
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteEst = (id: Number): void => {
    axios.delete(`http://localhost:3002/estudiante/${id}`)

  }


  return (
    <>
      <Layout>
        <div className={buttonstyle.button}>
          <button onClick={() => setModal(!modal)}>Agregar</button>

        </div>
        <table className={styles.tabla}>
          <thead >
            <tr className={styles.encabezado} >
              <th>ID</th>
              <th>Nombre</th>
              <th>Fecha de Nacimiento</th>
              <th>Direccion Domiciliaria</th>
              <th>Cedula</th>
              <th>Nombre representate</th>
              <th>Celular representate</th>
            </tr>
          </thead>
          <tbody>
            {data.map(estudiante => (
              <tr key={estudiante.id} className={styles.valuestr}>
                <td>{estudiante.id}</td>
                <td>{estudiante.nombre}</td>
                <td>{estudiante.fechaNacimiento}</td>
                <td>{estudiante.direccionDomiciliaria}</td>
                <td>{estudiante.cedula}</td>
                <td>{estudiante.nombreRepresentante}</td>
                <td>{estudiante.celularRepresentante}</td>
                <td><button className={buttonstyle.buttonDanger} onClick={() => setDeleteModal(!deleteModal)}>
                  <p>Eliminar</p>
                  <ModalErase isOpenModal={deleteModal} handleModalClose={() => setDeleteModal(false)} >
                      <div>
                        <h1 style={{"color": "black"}}>¿Esta seguro que desea eliminar este estudiante?</h1>
                        <p style={{"color": "black"}}>Nombre: {estudiante.nombre}</p>
                        <button onClick={() => handleDeleteEst(estudiante.id)}>Eliminar</button>
                        <button onClick={() => setDeleteModal(false)}>Cancelar</button>
                        
                      </div>
                      
                    </ModalErase>

                </button></td>
              </tr>
            ))}
          </tbody>

        </table>

        


        <Modal isOpenModal={modal} handleModalClose={() => setModal(false)} >
          <FormularioEstudiantes handleModalClose={() => setModal(false)} />
        </Modal>
      </Layout>
    </>
  )

}

export default estudiantes