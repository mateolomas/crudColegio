
import React from 'react'
import Layout from '../src/components/Layout'
import useFetchData from '../src/hooks/useFetchData';
import { useState, useEffect } from 'react';
import { Curso, Asignatura } from '../src/interfaces/schema';
import styles from '../src/styles/table.module.css'
import buttonstyle from '../src/styles/button.module.css'
import axios from 'axios';
import FormularioCursos from '../src/components/FormularioCursos';
import Modal from '../src/components/Modal';
import TableDataCursos from '../src/components/TableDataCursos';

interface DataCurso {
  data: Curso[];
  loading: boolean;
  error: string;
}

interface DataAsignatura {
  data: Asignatura[];
  loading: boolean;
  error: string;
}



const Cursos = () => {

  const { data: dataCurso, loading: loadingCurso, error: errorCurso }: DataCurso = useFetchData('curso');
  const { data: dataAsignatura, loading: loadingAsignatura, error: errorAsignatura }: DataAsignatura = useFetchData('asignatura');

  const [modal, setModal] = useState(false);
  const [cursoData, setData] = useState(dataCurso);
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [curso, setCurso] = useState<Curso>({
    id: 0,
    idAsignatura: "",
    idProfesor: "",
    capacidadEstudiantes: 0,
    fechaInicio: "",
    fechaFin: "",

  })

  const defaultCurso = {

    id: 0,
    idAsignatura: "",
    idProfesor: "",
    capacidadEstudiantes: 0,
    fechaInicio: "",
    fechaFin: "",

  }
  useEffect(() => {
    setData(dataCurso);

  }, [dataCurso]);


  const handleOpenModalDelete = (id: Number): void => {
    setDeleteModal(true);
    const curso = cursoData.find(cur => cur.id === id);
    curso ? setCurso(curso) : setCurso(defaultCurso);
  }

  const handleDeleteCurso = (id: Number): void => {
    axios.delete(`http://localhost:3002/curso/${id}`);
    setDeleteModal(false);
    const cursoIndex = cursoData.findIndex(cur => cur.id === id);
    const newData = [...cursoData];
    newData.splice(cursoIndex, 1);
    setData(newData);
  }


  const handleCreateCurso = (cursoAux: Curso): void => {
    axios.post(`http://localhost:3002/curso`, cursoAux).then(res => {
      const dataCur = res.data;
      const newData = [...cursoData];
      newData.push(dataCur);
      setData(newData);
    }).catch(error => {
      console.log(error, "error");
    });
  }

  const handleOpenModalEditCurso = (id: Number): void => {
    setModal(true);
    const curso = cursoData.find(cur => cur.id === id);
    if (curso) {
      setCurso(curso);
    }
  }

  const handleEditCurso = (cursoAux: Curso): void => {
    axios.put(`http://localhost:3002/curso/${cursoAux.id}`, cursoAux).then(res => {
      const dataCur = res.data;
      const newData = [...cursoData];
      const cursoIndex = newData.findIndex(cur => cur.id === dataCur.id);
      newData[cursoIndex] = dataCur;
      setData(newData);
    }).catch(error => {
      console.log(error, "error");
    });
  }





  return (
    <Layout>
      <h2>Cursos</h2>
      {loadingCurso && <p>Cargando...</p>}
      {errorCurso && <p>Error</p>}

      <div className={buttonstyle.button}>
        <button onClick={() => setAddModal(!modal)} >Agregar curso</button>
      </div>

      <Modal isOpenModal={addModal} handleModalClose={() => setAddModal(false)}>
        <FormularioCursos
          handleCreateCurso={handleCreateCurso}
          handleModalClose={() => setAddModal(false)}
          cursoSelected={defaultCurso}
          handleEditCurso={handleEditCurso}
        />

      </Modal>
      {/*edit button*/}

      <Modal isOpenModal={modal} handleModalClose={() => setModal(false)}>

        <FormularioCursos
          handleCreateCurso={handleCreateCurso}
          handleModalClose={() => setModal(false)}
          cursoSelected={curso}
          handleEditCurso={handleEditCurso}
        />

      </Modal>

      {/*edit button*/}










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
          <TableDataCursos
            data={cursoData}
            handleDeleteCurso={handleOpenModalDelete}
            handleEditCurso={handleOpenModalEditCurso}
          />

        </tbody>

      </table>


      <Modal isOpenModal={deleteModal} handleModalClose={() => setDeleteModal(false)}>
        <div className={styles.modal}>

          <h2>¿Estas seguro que deseas eliminar el curso?</h2>
          <p>Curso id: {curso.id} </p>
          <p>Asignatura id: {curso.idAsignatura} </p>
          <p>Profesor id: {curso.idProfesor} </p>

          <button onClick={() => handleDeleteCurso(curso.id)}>Eliminar</button>
          <button onClick={() => setDeleteModal(false)}>Cancelar</button>

        </div>
      </Modal>



      <h2>Asignaturas</h2>


      <table className={styles.tabla}>
        <thead>
          <tr className={styles.encabezado}>
            <th>ID</th>
            <th>Nombre</th>
            <th>Id Colegio</th>
          </tr>
        </thead>
        <tbody>
          {dataAsignatura.map((asignatura: Asignatura) => {
            return (
              <tr key={asignatura.id} className={styles.valuestr}>
                <td>{asignatura.id}</td>
                <td>{asignatura.nombre}</td>
                <td>{asignatura.idColegio}</td>

              </tr>);
          })}
        </tbody>
      </table>

    </Layout>

  )
}

export default Cursos