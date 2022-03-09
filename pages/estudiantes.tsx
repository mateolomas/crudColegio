import Link from "next/link";
import React, { useEffect } from "react";
import FormularioEstudiantes from "../src/components/FormularioEstudiantes";
import Layout from "../src/components/Layout";

import styles from "../src/styles/table.module.css";
import buttonstyle from "../src/styles/button.module.css";
import { useState } from "react";
import Modal from "../src/components/Modal";
import axios from "axios";
import { Data, Estudiante } from "../src/interfaces/schema";
import TableDataEstudiante from "../src/components/TableDataEstudiante";
import useFetchDataEstudiante from "../src/hooks/useFetchDataEstudiante";

const Estudiantes = () => {
  const { data, loading, error }: Data = useFetchDataEstudiante();
  const [modal, setModal] = useState<boolean>(false);
  const [estudentData, setData] = useState<Estudiante[]>(data);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [estudiante, setEstudiante] = useState<Estudiante>({
    id: 0,
    nombre: "",
    fechaNacimiento: "",
    direccionDomiciliaria: "",
    cedula: "",
    nombreRepresentante: "",
    celularRepresentante: "",
  });

  const defaultEstudiante: Estudiante = {
    id: 0,
    nombre: "",
    fechaNacimiento: "",
    direccionDomiciliaria: "",
    cedula: "",
    nombreRepresentante: "",
    celularRepresentante: "",
  };

  useEffect(() => {
    setData(data);
  }, [data]);

  const handleOpenModalDelete = (id: Number): void => {
    setDeleteModal(true);
    const estudiante = estudentData.find((est) => est.id === id);
    estudiante ? setEstudiante(estudiante) : setEstudiante(defaultEstudiante);
  };

  const handleDeleteEstudent = (id: Number): void => {
    axios.delete(`http://localhost:3002/estudiante/${id}`);
    setDeleteModal(false);
    const estudianteIndex = estudentData.findIndex((est) => est.id === id);
    const newData = [...estudentData];
    newData.splice(estudianteIndex, 1);
    setData(newData);
  };

  const handleCreateEstudent = (estudianteAux: Estudiante): void => {
    axios
      .post(`http://localhost:3002/estudiante`, estudianteAux)
      .then((res) => {
        const dataEst = res.data;
        const newData = [...estudentData];
        newData.push(dataEst);
        setData(newData);
      })
      .catch((error) => {
        console.log(error, "error");
        alert(error);
      });
  };

  const handleOpenModalEditEst = (id: Number): void => {
    setModal(true);
    const estudiante = estudentData.find((est) => est.id === id);
    if (estudiante) setEstudiante(estudiante);
  };

  const handleEditEstudent = (estudianteAux: Estudiante): void => {
    axios
      .put(
        `http://localhost:3002/estudiante/${estudianteAux.id}`,
        estudianteAux
      )
      .then((res) => {
        const dataEst = res.data;
        const newData = [...estudentData];
        const estudianteIndex = estudentData.findIndex(
          (est) => est.id === dataEst.id
        );
        newData[estudianteIndex] = dataEst;
        setData(newData);
      })
      .catch((error) => {
        console.log(error, "error");
        alert(error);
      });
  };

  return (
    <>
      <Layout>
        <h1>Informacion de Estudiantes</h1>
        {loading && <p>Cargando...</p>}
        {error && <p>Error</p>}

        {/*Agregar data y abre formulario en el modal */}
        <div className={buttonstyle.button}>
          <button onClick={() => setAddModal(!modal)}>Agregar</button>
        </div>

        <Modal
          isOpenModal={addModal}
          handleModalClose={() => setAddModal(false)}
        >
          <FormularioEstudiantes
            handleCreateEstudent={handleCreateEstudent}
            handleModalClose={() => setAddModal(false)}
            estudianteSelected={defaultEstudiante}
            handleEditEstudent={handleEditEstudent}
          />
        </Modal>

        {/*edit button*/}
        <Modal isOpenModal={modal} handleModalClose={() => setModal(false)}>
          <FormularioEstudiantes
            handleCreateEstudent={handleCreateEstudent}
            handleModalClose={() => setModal(false)}
            estudianteSelected={estudiante}
            handleEditEstudent={handleEditEstudent}
          />
        </Modal>
        {/*tabla */}

        <table className={styles.tabla}>
          <thead>
            <tr className={styles.encabezado}>
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
              data={estudentData}
              handleDeleteEst={handleOpenModalDelete}
              handleEditEst={handleOpenModalEditEst}
            />
          </tbody>
        </table>
        <Modal
          isOpenModal={deleteModal}
          handleModalClose={() => setDeleteModal(false)}
        >
          <div style={{ color: "black" }}>
            <h1>¿Esta seguro que desea eliminar este estudiante?</h1>
            <p>Nombre: {estudiante.nombre}</p>
            <button onClick={() => handleDeleteEstudent(estudiante.id)}>
              Eliminar
            </button>
            <button onClick={() => setDeleteModal(false)}>Cancelar</button>
          </div>
        </Modal>
      </Layout>
    </>
  );
};

export default Estudiantes;
