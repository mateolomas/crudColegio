import Link from 'next/link'
import React from 'react'
import Formulario from '../src/components/Form'
import Layout from '../src/components/Layout'
import useFetchData from '../src/hooks/useFetchData'


const estudiantes = () => {

  const data = useFetchData("estudiante")
  

  return (
    <>
    <Layout>
    <table >
      <thead>
        <tr>
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
          <tr key={estudiante.id}>
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

    <Link href="/">
      <a>Home Page</a>
    </Link>



          <Formulario />










    </Layout>
    </>
  )

}

export default estudiantes