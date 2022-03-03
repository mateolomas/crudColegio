import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useState } from "react";
import { profesorValidation } from "../Validations/profesorValidation";
import usePostData from '../hooks/usePostData';

interface FormProps {
    handleModalClose: () => void
}


const FormularioProfesores = ({ handleModalClose }: FormProps) => {


    return (
        <>
            <Formik
                onSubmit={(values, { resetForm }) => {
                    resetForm();
                    console.log(values);
                    alert(values);
                    handleModalClose();
                    usePostData(values, "profesor");

                }}

                validationSchema={profesorValidation}

                initialValues={{
                    nombre: "",
                    correo: "",
                    fechaNacimiento: "",
                    direccionDomicilaria: "",
                    cedula: "",
                    celular: "",

                }}
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
                        <div>
                            <label htmlFor="nombre">Nombre</label>
                            <Field
                                type="text"
                                name="nombre"
                                id="nombre"
                                placeholder="Pedro Carbo"
                            />
                            <ErrorMessage
                                name="nombre"
                                component={() => <div>{errors.nombre}</div>}
                            />
                        </div>

                        <div>
                            <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                            <Field
                                type="text"
                                name="fechaNacimiento"
                                id="fechaNacimiento"
                                placeholder="12/12/1999"
                            />
                            <ErrorMessage
                                name="fechaNacimiento"
                                component={() => <div>{errors.fechaNacimiento}</div>}
                            />
                        </div>

                        <div>
                            <label htmlFor="direccionDomicilaria">Direccion domiciliaria</label>
                            <Field
                                type="text"
                                name="direccionDomicilaria"
                                id="direccionDomicilaria"
                                placeholder="Av. La Paz"
                            />
                            <ErrorMessage
                                name="direccionDomicilaria"
                                component={() => <div>{errors.direccionDomicilaria}</div>}
                            />

                        </div>

                        <div>
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

                        <div>
                            <label htmlFor="celular">Celular</label>
                            <Field
                                type="text"
                                name="celular"
                                id="celular"
                                placeholder="0987654321"
                            />
                            <ErrorMessage
                                name="celular"
                                component={() => <div>{errors.celular}</div>}
                            />
                        </div>

                        <div>
                            <label htmlFor="correo">Correo</label>
                            <Field
                                type="text"
                                name="correo"
                                id="correo"
                                placeholder="mateo@correo.com"
                            />
                            <ErrorMessage
                                name="correo"
                                component={() => <div>{errors.correo}</div>}
                            />
                        </div>

                        <button type="submit">Enviar</button>

                    </Form>
                )}
            </Formik>
        </>
    );
};

export default FormularioProfesores;