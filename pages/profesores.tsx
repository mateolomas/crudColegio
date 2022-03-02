import Link from 'next/link'
import React from 'react'
import Layout from '../src/components/Layout'
import useFetchData from '../src/hooks/useFetchData'


const profesores = () => {


  const data = useFetchData('profesor')
  return (
    <>
    <Layout>
    <table border="1" >
    <thead>
      <tr>
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
        <tr key={profesor.id}>
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

  <Link href="/">
  <a>Regresar a pagina principal</a>
  </Link>
  </Layout>
  </>
  )
}

export default profesores