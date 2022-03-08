
import React from 'react'
import Layout from '../src/components/Layout'
import useFetchData from '../src/hooks/useFetchData';
import { useState } from 'react';
import { Curso, Asignatura } from '../src/interfaces/schema';
import styles from '../src/styles/table.module.css'
import buttonstyle from '../src/styles/button.module.css'
import axios from 'axios';
import FormularioCursos from '../src/components/FormularioCursos';
import Modal from '../src/components/Modal';

const Cursos = () => {

  const curso = useFetchData('curso');
  const asignaturas = useFetchData('asignatura');

  const cursoData: Curso[] = curso;
  const asignaturasData: Asignatura[] = asignaturas;

  const [modalCurso, setModalCurso] = useState(false);
  const [modalAsignatura, setModalAsignatura] = useState(false);

  const handleDeleteCurso = (id: Number): void => {
    axios.delete(`http://localhost:3002/curso/${id}`)
  }

  const handleDeleteAsignatura = (id: Number): void => {
    axios.delete(`http://localhost:3002/asignatura/${id}`)
  }

  return (
    <Layout>
      <h2>Cursos</h2>
      <div className={buttonstyle.button}>
        <button onClick={() => setModalCurso(!modalCurso)} >Agregar curso</button>

      </div>

      <table className={styles.tabla}>
        <thead>
          <tr className={styles.encabezado}>
            <th>ID</th>
            <th>Id Asignatura</th>
            <th>Id profesor</th>
            <th>Capacidad Estudiantes</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
          </tr>
        </thead>
        <tbody>
          {cursoData.map((curso: Curso) => {
            return (
              <tr key={curso.id} className={styles.valuestr}>
                <td>{curso.id}</td>
                <td>{curso.idAsignatura}</td>
                <td>{curso.idProfesor}</td>
                <td>{curso.capacidadEstudiantes}</td>
                <td>{curso.fechaInicio}</td>
                <td>{curso.fechaFin}</td>
                <td><button type="submit" className={buttonstyle.buttonDanger} onClick={() => handleDeleteCurso(curso.id)}>Eliminar</button></td>
              </tr>
            );
          })}
        </tbody>

      </table>

      <Modal isOpenModal={modalCurso} handleModalClose={() => setModalCurso(false)} >
        <FormularioCursos handleModalClose={() => setModalCurso(false)} />
      </Modal>

      <h2>Asignatura</h2>
      <div className={buttonstyle.button}>
        <button onClick={() => setModalAsignatura(!modalAsignatura)}>Agregar asignatura</button>

      </div>

      <table className={styles.tabla}>
        <thead>
          <tr className={styles.encabezado}>
            <th>ID</th>
            <th>Nombre</th>
            <th>Id Colegio</th>
          </tr>
        </thead>
        <tbody>
          {asignaturasData.map((asignatura: Asignatura) => {
            return (
              <tr key={asignatura.id} className={styles.valuestr}>
                <td>{asignatura.id}</td>
                <td>{asignatura.nombre}</td>
                <td>{asignatura.idColegio}</td>
                <td><button className={buttonstyle.buttonDanger} onClick={() => handleDeleteAsignatura(asignatura.id)}>Eliminar</button></td>
              </tr>);
          })}
        </tbody>
      </table>
      <Modal isOpenModal={modalAsignatura} handleModalClose={() => setModalAsignatura(false)} >
        <FormularioCursos handleModalClose={() => setModalAsignatura(false)} />
      </Modal>
    </Layout>

  )
}

export default Cursos