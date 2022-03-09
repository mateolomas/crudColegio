import Link from 'next/link'
import React from 'react'
import { useState, useEffect } from 'react';
import Layout from '../src/components/Layout'
import styles from '../src/styles/table.module.css'
import buttonstyle from '../src/styles/button.module.css'
import Modal from '../src/components/Modal'
import FormularioProfesores from '../src/components/FormularioProfesores';
import axios from 'axios'
import TableDataProfesores from '../src/components/TableDataProfesores';
import { Profesor } from '../src/interfaces/schema';
import useFetchDataProfesor from '../src/hooks/useFetchDataProfesor';

interface Data {
  data: Profesor[],
  loading: boolean;
  error: any;
}

const Profesores = () => {

  const { data, loading, error }: Data = useFetchDataProfesor();
  const [modal, setModal] = useState(false);
  const [profesorData, setData] = useState(data);
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [profesor, setProfesor] = useState<Profesor>({
    id: 0,
    nombre: "",
    direccionDomicilaria: "",
    fechaNacimiento: "",
    cedula: 0,
    celular: "",
    correo: ""

  });

  const defaultProfesor: Profesor = {
    id: 0,
    nombre: "",
    direccionDomicilaria: "",
    fechaNacimiento: "",
    cedula: 0,
    celular: "",
    correo: ""
  }

  useEffect(() => {
    setData(data);
  }, [data]);


  const handleOpenModalDelete = (id: Number): void => {
    setDeleteModal(true);
    const profesor = profesorData.find(est => est.id === id);
    profesor ? setProfesor(profesor) : setProfesor(defaultProfesor);
  }

  const handleDeleteProfesor = (id: Number): void => {
    axios.delete(`http://localhost:3002/profesor/${id}`);
    setDeleteModal(false);
    const profesorIndex = profesorData.findIndex(est => est.id === id);
    const newData = [...profesorData];
    newData.splice(profesorIndex, 1);
    setData(newData);

  }

  const handleCreateProfesor = (profesorAux: Profesor): void => {
    axios.post(`http://localhost:3002/profesor`, profesorAux).then(res => {
      const dataProf = res.data;
      const newData = [...profesorData];
      newData.push(dataProf);
      setData(newData);
    })
      .catch(
        error => {
          console.log(error, "error");
          alert(error);
        }
      )

  }


  const handleOpenModalEditEst = (id: Number): void => {
    setModal(true);
    const profesor = profesorData.find(est => est.id === id);
    if (profesor)
      setProfesor(profesor);
  }

  const handleEditProfesor = (profesorAux: Profesor): void => {
    axios.put(`http://localhost:3002/profesor/${profesorAux.id}`, profesorAux).then(res => {
      const dataProf = res.data;
      const newData = [...profesorData];
      const profesorIndex = profesorData.findIndex(est => est.id === profesorAux.id);
      newData[profesorIndex] = dataProf;
      setData(newData);
    })
      .catch(
        error => {
          console.log(error, "error");
          alert(error);
        }
      )
  }









  return (
    <>
      <Layout>
        <h1>Informacion de Prof</h1>
        {loading && <p>Cargando...</p>}
        {error && <p>Error</p>}


        {/*Agregar data y abre formulario en el modal */}
        <div className={buttonstyle.button}>
          <button onClick={() => setAddModal(!modal)}>Agregar</button>
        </div>

        <Modal isOpenModal={addModal} handleModalClose={() => setAddModal(false)}>
          <FormularioProfesores
            handleCreateProfesor={handleCreateProfesor}
            handleModalClose={() => setAddModal(false)}
            profesorSelected={defaultProfesor}
            handleEditProfesor={handleEditProfesor}
          />
        </Modal>



        {/*edit button*/}
        <Modal isOpenModal={modal} handleModalClose={() => setModal(false)} >
          <FormularioProfesores
            handleCreateProfesor={handleCreateProfesor}
            handleModalClose={() => setModal(false)}
            profesorSelected={profesor}
            handleEditProfesor={handleEditProfesor}
          />

        </Modal>

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
            <TableDataProfesores
              data={profesorData}
              handleDeleteProfesor={handleOpenModalDelete}
              handleEditProfesor={handleOpenModalEditEst}

            />
          </tbody>

        </table>
        <Modal isOpenModal={deleteModal} handleModalClose={() => setDeleteModal(false)} >
          <div style={{ "color": "black" }}>
            <h1 >¿Esta seguro que desea eliminar este profesor?</h1>
            <p >Nombre: {profesor.nombre}</p>
            <button onClick={() => handleDeleteProfesor(profesor.id)}>Eliminar</button>
            <button onClick={() => setDeleteModal(false)}>Cancelar</button>
          </div>
        </Modal>



      </Layout>
    </>
  )
}

export default Profesores