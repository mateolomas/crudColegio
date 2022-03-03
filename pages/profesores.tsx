import Link from 'next/link'
import React from 'react'
import Layout from '../src/components/Layout'
import useFetchData from '../src/hooks/useFetchData'
import styles from '../src/styles/table.module.css'
import buttonstyle from '../src/styles/button.module.css'
import Modal from '../src/components/Modal'
import FormularioProfesores from '../src/components/FormularioProfesores'

const profesores = () => {


  const data = useFetchData('profesor')
  return (
    <>
    <Layout>
    <table border="1" className={styles.tabla}>
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
        </tr>
      ))}
  </tbody>

  </table>

  <Modal props={<FormularioProfesores />} />

  </Layout>
  </>
  )
}

export default profesores