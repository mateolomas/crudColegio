import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import styles from "../styles/forms.module.css";
import usePostData from "../hooks/usePostData";
import { Curso } from "../interfaces/schema";


interface FormProps {
    handleModalClose: () => void
    cursoSelected: Curso
    handleCreateCurso: (curso: Curso) => void
    handleEditCurso: (curso: Curso) => void

}

const FormularioCursos = ({ handleModalClose, cursoSelected, handleCreateCurso, handleEditCurso }: FormProps) => {

    const defaultCurso = {
        idAsignatura: "",
        idProfesor: "",
        capacidadEstudiantes: 0,
        fechaInicio: "",
        fechaFin: "",
    }

    const initialValues = cursoSelected || defaultCurso;


    return (
        <>
            <Formik
                onSubmit={(values, { resetForm }) => {
                    resetForm();
                    handleModalClose();
                    if (cursoSelected.idAsignatura === ""
                        && cursoSelected.idProfesor === ""
                        && cursoSelected.capacidadEstudiantes === 0
                        && cursoSelected.fechaInicio === ""
                        && cursoSelected.fechaFin === "") {
                        handleCreateCurso(values);
                    } else {
                        handleEditCurso(values);
                    }


                }}
                //validationSchema={estudianteValidation}

                initialValues={initialValues}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <Form>
                        <div className={styles.field}>
                            <label htmlFor="nombre">ID Asignatura</label>
                            <Field
                                type="text"
                                name="idAsignatura"
                                id="idAsignatura"
                                placeholder="0001"
                            />
                            <ErrorMessage
                                name="idAsignatura"
                                component={() => <div>{errors.idAsignatura}</div>}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="nombre">ID Profesor</label>
                            <Field
                                type="text"
                                name="idProfesor"
                                id="idProfesor"
                                placeholder="0001"
                            />
                            <ErrorMessage
                                name="idProfesor"
                                component={() => <div>{errors.idProfesor}</div>}
                            />
                        </div>




                        <div className={styles.field}>
                            <label htmlFor="capacidadEstudiantes">Capacidad Estudiantes</label>
                            <Field
                                type="text"
                                name="capacidadEstudiantes"
                                id="capacidadEstudiantes"
                                placeholder="20"
                            />
                            <ErrorMessage
                                name="cedula"
                                component={() => <div>{errors.capacidadEstudiantes}</div>}
                            />
                        </div>



                        <div className={styles.field}>
                            <label htmlFor="fechaInicio">Fecha Inicio</label>
                            <Field
                                type="date"
                                name="fechaInicio"
                                id="fechaInicio"
                                placeholder="12/12/2022"
                            />
                            <ErrorMessage
                                name="fechaInicio"
                                component={() => <div>{errors.fechaInicio}</div>}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="fechaFin">Fecha Fin</label>
                            <Field
                                type="date"
                                name="fechaFin"
                                id="fechaFin"
                                placeholder="12/12/2023"
                            />
                            <ErrorMessage
                                name="fechaFin"
                                component={() => <div>{errors.fechaFin}</div>}
                            />
                        </div>

                        <button type="submit">Enviar</button>

                    </Form>
                )}
            </Formik>
        </>
    );
};

export default FormularioCursos;