import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import styles from "../styles/forms.module.css";

import { Asignatura, Curso, Profesor } from "../interfaces/schema";
import useFetchDataProfesor from "../hooks/useFetchDataProfesor";
import useFetchDataAsignatura from "../hooks/useFetchDataAsignatura";

interface FormProps {
    handleModalClose: () => void;
    cursoSelected: Curso;
    handleCreateCurso: (curso: Curso) => void;
    handleEditCurso: (curso: Curso) => void;
}

interface DataAsignatura {
    data: Asignatura[];
    loading: boolean;
    error: string;
}

interface DataProfesor {
    data: Profesor[];
    loading: boolean;
    error: string;
}

const FormularioCursos = ({
    handleModalClose,
    cursoSelected,
    handleCreateCurso,
    handleEditCurso,
}: FormProps) => {
    const {
        data: dataAsignatura,
        loading: loadingAsignatura,
        error: errorAsignatura,
    }: DataAsignatura = useFetchDataAsignatura();
    const {
        data: dataProfesor,
        loading: loadingProfesor,
        error: errorProfesor,
    }: DataProfesor = useFetchDataProfesor();

    const defaultCurso: Curso = {
        id: 0,
        idAsignatura: 0,
        idProfesor: 0,
        capacidadEstudiantes: 0,
        fechaInicio: "",
        fechaFin: "",
    };

    const initialValues = cursoSelected || defaultCurso;

    return (
        <>
            <Formik
                onSubmit={(values, { resetForm }) => {
                    resetForm();
                    handleModalClose();

                    if (
                        cursoSelected.idAsignatura === 0 &&
                        cursoSelected.idProfesor === 0 &&
                        cursoSelected.capacidadEstudiantes === 0 &&
                        cursoSelected.fechaInicio === "" &&
                        cursoSelected.fechaFin === ""
                    ) {
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
                            <label htmlFor="idAsignatura">Asignatura</label>
                            <Field as="select" name="idAsignatura" id="idAsignatura">
                                <option value="">Seleccione una asignatura</option>
                                {dataAsignatura.map((asignatura: Asignatura) => {
                                    return (
                                        <option key={asignatura.id} value={asignatura.id}>
                                            {asignatura.nombre}
                                        </option>
                                    );
                                })}
                            </Field>

                            <ErrorMessage
                                name="idAsignatura"
                                component={() => <div>{errors.idAsignatura}</div>}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="idProfesor">ID Profesor</label>
                            <Field as="select" name="idProfesor" id="idProfesor">
                                <option value="">Seleccione un profesor</option>
                                {dataProfesor.map((profesor: Profesor) => {
                                    return (
                                        <option key={profesor.id} value={profesor.id}>
                                            {profesor.nombre}
                                        </option>
                                    );
                                })}
                            </Field>
                            <ErrorMessage
                                name="idProfesor"
                                component={() => <div>{errors.idProfesor}</div>}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="capacidadEstudiantes">
                                Capacidad Estudiantes
                            </label>
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
