import Link from 'next/link'
import React from 'react'
import Formulario from '../src/components/Form'
import Layout from '../src/components/Layout'
import useFetchData from '../src/hooks/useFetchData'
import styles from '../src/styles/table.module.css'
import buttonstyle from '../src/styles/button.module.css'
import { useState } from 'react'
import Modal from '../src/components/Modal'


const estudiantes = () => {

  const data = useFetchData("estudiante");
  const [modal, setModal] = useState(false);


  return (
    <>
      <Layout>
        <table className={styles.tabla}>
          <thead >
            <tr className={styles.encabezado} >
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
                <td>{estudiante.nombre}</td>
                <td>{estudiante.fechaNacimiento}</td>
                <td>{estudiante.direccionDomiciliaria}</td>
                <td>{estudiante.cedula}</td>
                <td>{estudiante.nombreRepresentante}</td>
                <td>{estudiante.celularRepresentante}</td>
              </tr>
            ))}
          </tbody>

        </table>
        <Modal />
      </Layout>
    </>
  )

}

export default estudiantes