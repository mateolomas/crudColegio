
import React from 'react'
import Layout from '../src/components/Layout'

import { useState, useEffect } from 'react';
import { Curso, Asignatura, Profesor, CursosData } from '../src/interfaces/schema';
import styles from '../src/styles/table.module.css'
import buttonstyle from '../src/styles/button.module.css'
import axios from 'axios';
import FormularioCursos from '../src/components/FormularioCursos';
import Modal from '../src/components/Modal';
import TableDataCursos from '../src/components/TableDataCursos';
import useFetchDataAll from '../src/hooks/useFetchDataAll';



interface Data {
  data: CursosData[]
  loading: boolean
  error: string
}
interface DataTable {
  curso: Curso
  asignatura: Asignatura
  profesor: Profesor
}

const defaultCurso: Curso = {
  id: 0,
  idAsignatura: 0,
  idProfesor: 0,
  capacidadEstudiantes: 0,
  fechaInicio: "",
  fechaFin: "",

}


const defaultAsignatura: Asignatura = {
  id: 0,
  idColegio: 0,
  nombre: ""
}

const defaultProfesor: Profesor = {
  id: 0,
  nombre: "",
  direccionDomicilaria: "",
  fechaNacimiento: "",
  cedula: 0,
  celular: "",
  correo: ""
}


const defaultCursoData: CursosData = {
  curso: defaultCurso,
  asignatura: defaultAsignatura,
  profesor: defaultProfesor
}


const Cursos = () => {

  const { data, loading, error }: Data = useFetchDataAll();
  const [cursoData, setData] = useState<CursosData[]>(data);

  {/* CURSO SELECTED  */ }
  const [curso, setCurso] = useState<Curso>(defaultCurso);
  {/* CURSO SELECTED  */ }

  {/* MODALES */ }
  const [modal, setModal] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  {/* MODALES */ }

  useEffect(() => {
    setData(data)
  }, [data]);




  {/*Modales handling*/ }
  const handleOpenModalDelete = (id: Number): void => {
    setDeleteModal(true);
    const curso = cursoData.map((elem) => elem.curso).find((elem: Curso) => elem.id === id);
    if (curso)
      setCurso(curso)
  }

  const handleOpenModalEditCurso = (id: Number): void => {
    setModal(true);
    const curso = cursoData.map((elem) => elem.curso).find(cur => cur.id === id);
    if (curso) {
      setCurso(curso);
    }
  }
  {/*Modales handling end*/ }

  const handleDeleteCurso = (id: Number): void => {
    axios.delete(`http://localhost:3002/curso/${id}`);
    setDeleteModal(false);
    const cursoIndex = cursoData.map(elem => elem.curso).findIndex(cur => cur.id === id);
    const newData = [...cursoData.map(elem => elem.curso)];
    newData.splice(cursoIndex, 1);

    const newDataAll = newData.map((elem: Curso) => {
      const asignatura = data.map(elem => elem.asignatura).find(asig => asig.id == elem.idAsignatura);
      const profesor = data.map(elem => elem.profesor).find(prof => prof.id == elem.idProfesor);
      return {
        curso: elem,
        asignatura: asignatura,
        profesor: profesor
      }
    })

    console.log(newDataAll, "handleDeleteCurso");
    setData(newDataAll);

  }



  const handleCreateCurso = (cursoAux: Curso): void => {
    axios.post(`http://localhost:3002/curso`, cursoAux).then(res => {
      const dataCur = res.data;
      const newData = [...cursoData.map(elem => elem.curso)];
      newData.push(dataCur);

      const newDataAll = newData.map((elem: Curso) => {
        const asignatura = data.map(elem => elem.asignatura).find(asig => asig.id == elem.idAsignatura);
        const profesor = data.map(elem => elem.profesor).find(prof => prof.id == elem.idProfesor);
        return {
          curso: elem,
          asignatura: asignatura,
          profesor: profesor
        }
      })

      console.log(newDataAll, "handleCreateCurso");
      setData(newDataAll);




    }).catch(error => {
      console.log(error, "error");
    });
  }



  const handleEditCurso = (cursoAux: Curso): void => {
    axios.put(`http://localhost:3002/curso/${cursoAux.id}`, cursoAux).then(res => {
      const dataCur = res.data;
      const newData = [...cursoData.map(elem => elem.curso)];
      const cursoIndex = newData.findIndex(cur => cur.id === dataCur.id);
      newData[cursoIndex] = dataCur;

      const newDataAll = newData.map((elem: Curso) => {
        const asignatura = data.map(elem => elem.asignatura).find(asig => asig.id == elem.idAsignatura);
        const profesor = data.map(elem => elem.profesor).find(prof => prof.id == elem.idProfesor);
        return {
          curso: elem,
          asignatura: asignatura,
          profesor: profesor
        }
      })

      console.log(newDataAll, "handleEditCurso");
      setData(newDataAll);



    }).catch(error => {
      console.log(error, "error");
    });
  }




  return (
    <Layout>
      <h2>Cursos</h2>


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
        {<tbody>
          {/*loading ? <tr><td>Cargando...</td></tr> : error*/}
          {<TableDataCursos
            data={cursoData}
            handleDeleteCurso={handleOpenModalDelete}
            handleEditCurso={handleOpenModalEditCurso}
          />
          }
        </tbody>}

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

      {/* 
      <h2>Asignaturas</h2>


      <table className={styles.tabla}>
        <thead>
          <tr className={styles.encabezado}>
            <th>ID</th>
            <th>Nombre</th>
            <th>Id Colegio</th>
          </tr>
        </thead>
        {<tbody>
          {dataAsignatura.map((asignatura: Asignatura) => {
            return (
              <tr key={asignatura.id} className={styles.valuestr}>
                <td>{asignatura.id}</td>
                <td>{asignatura.nombre}</td>
                <td>{asignatura.idColegio}</td>

              </tr>);
          })}
        </tbody>}
      </table> */}

    </Layout>

  )
}

export default Cursos