import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";

import styles from "../styles/forms.module.css";
import { estudianteValidation } from "../Validations/estudianteValidation";
import usePostData from "../hooks/usePostData";
import axios from "axios";
import { Estudiante } from '../interfaces/schema';

interface FormProps {
    handleModalClose: () => void
    estudianteSelected: Estudiante
}

const FormularioEstudiantes = ({ handleModalClose, estudianteSelected }: FormProps) => {

    const defaultEstudiante = {
        nombre: "",
        fechaNacimiento: "",
        direccionDomiciliaria: "",
        cedula: "",
        nombreRepresentante: "",
        celularRepresentante: "",
    }

    const initialValues = estudianteSelected || defaultEstudiante;


    return (
        <>
            <Formik
                onSubmit={(values, { resetForm }) => {

                    resetForm();
                    alert(values);
                    console.log(values);
                    handleModalClose();
                    if (
                        usePostData(values, "estudiante");



                }}
                validationSchema={estudianteValidation}

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
                            <label htmlFor="nombre">Nombre</label>
                            <Field
                                type="text"
                                name="nombre"
                                id="nombre"
                                placeholder="Mateo Sebastian Lomas"
                            />
                            <ErrorMessage
                                name="nombre"
                                component={() => <div>{errors.nombre}</div>}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                            <Field
                                type="text"
                                name="fechaNacimiento"
                                id="fechaNacimiento"
                                placeholder="12/12/1999"
                            />
                            <ErrorMessage
                                name="fnacimiento"
                                component={() => <div>{errors.fechaNacimiento}</div>}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="direccionDomiciliaria">Direccion</label>
                            <Field
                                type="text"
                                name="direccionDomiciliaria"
                                id="direccionDomiciliaria"
                                placeholder="Av. La Paz"
                            />
                            <ErrorMessage
                                name="direccionDomiciliaria"
                                component={() => <div>{errors.direccionDomiciliaria}</div>}
                            />

                        </div>

                        <div className={styles.field}>
                            <label htmlFor="cedula">Cedula</label>
                            <Field
                                type="text"
                                name="cedula"
                                id="cedula"
                                placeholder="1000123458"
                            />
                            <ErrorMessage
                                name="cedula"
                                component={() => <div>{errors.cedula}</div>}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="nombreRepresentante">Nombre representante</label>
                            <Field
                                type="text"
                                name="nombreRepresentante"
                                id="nombreRepresentante"
                                placeholder="Juan Lopez"
                            />
                            <ErrorMessage
                                name="nombreRepresentante"
                                component={() => <div>{errors.nombreRepresentante}</div>}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="crepresentante">Celular representante</label>
                            <Field
                                type="text"
                                name="celularRepresentante"
                                id="celularRepresentante"
                                placeholder="0987654321"
                            />
                            <ErrorMessage
                                name="celularRepresentante"
                                component={() => <div>{errors.celularRepresentante}</div>}
                            />
                        </div>

                        <button type="submit">Enviar</button>
                        {/*formulario && <h1>Formulario enviado</h1>*/}
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default FormularioEstudiantes;