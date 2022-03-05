import Link from 'next/link'
import React, { useEffect } from 'react'
import FormularioEstudiantes from '../src/components/FormularioEstudiantes';
import Layout from '../src/components/Layout'
import useFetchData from '../src/hooks/useFetchData'
import styles from '../src/styles/table.module.css'
import buttonstyle from '../src/styles/button.module.css'
import { useState } from 'react'
import Modal from '../src/components/Modal'
import axios from 'axios'
import ModalErase from '../src/components/ModalErase';
import { Estudiante } from '../src/interfaces/schema';
import TableDataEstudiante from '../src/components/TableDataEstudiante';

const estudiantes = () => {

  const estudianteData = useFetchData("estudiante");
  const [data, setData] = useState<Estudiante[]>(estudianteData);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [estudiante, setEstudiante] = useState<Estudiante>({
    id: 0,
    nombre: "",
    fechaNacimiento: "",
    direccionDomiciliaria: "",
    cedula: "",
    nombreRepresentante: "",
    celularRepresentante: "",

  });

  useEffect(() => {
    setData(estudianteData);
  }, [estudianteData]);


  const handleDeleteEst = (id: Number): void => {
    setDeleteModal(true);
    const estudiante = data.find(est => est.id === id);
    if (estudiante)
      setEstudiante(estudiante);

  }

  const handleConfirmDelete = (id: Number): void => {
    axios.delete(`http://localhost:3002/estudiante/${id}`);
    setDeleteModal(false);
    const estudianteIndex = data.findIndex(est => est.id === id);
    const newData = [...data];
    newData.splice(estudianteIndex, 1);
    setData(newData);

  }

  const handleEditEst = (id: Number): void => {
    setModal(true);
    const estudiante = data.find(est => est.id === id);
    if (estudiante)
      setEstudiante(estudiante);

  }

  const handleConfirmEdit = (id: Number): void => {
    axios.put(`http://localhost:3002/estudiante/${id}`, estudiante);
    setModal(false);
    const estudianteIndex = data.findIndex(est => est.id === id);
    const newData = [...data];
    newData.splice(estudianteIndex, 1);
    setData(newData);
  }


  return (
    <>
      <Layout>
        {/*Agregar data y abre formulario en el modal */}
        <div className={buttonstyle.button}>
          <button onClick={() => setModal(!modal)}>Agregar</button>
        </div>
        <Modal isOpenModal={modal} handleModalClose={() => setModal(false)} >
          <FormularioEstudiantes handleConfirmEdit={() => handleConfirmEdit} handleModalClose={() => setModal(false)} estudianteSelected={estudiante} />
        </Modal>
        {/*tabla */}
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
            <TableDataEstudiante
              data={data}
              handleDeleteEst={handleDeleteEst}
              handleEditEst={handleEditEst}
              handleConfirmEdit={handleConfirmEdit}
            />
          </tbody>
        </table>
        <ModalErase isOpenModal={deleteModal} handleModalClose={() => setDeleteModal(false)} >
          <div style={{ "color": "black" }}>
            <h1 >¿Esta seguro que desea eliminar este estudiante?</h1>
            <p >Nombre: {estudiante.nombre}</p>
            <button onClick={() => handleConfirmDelete(estudiante.id)}>Eliminar</button>
            <button onClick={() => setDeleteModal(false)}>Cancelar</button>
          </div>
        </ModalErase>
      </Layout>
    </>
  )

}

export default estudiantes