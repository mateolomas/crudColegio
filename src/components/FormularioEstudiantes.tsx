import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useState } from "react";
import styles from "../styles/forms.module.css";

const FormularioEstudiantes = () => {
    const [formulario, setFormulario] = useState(false);

    return (
        <>
            <Formik
                onSubmit={(values, { resetForm }) => {
                    resetForm();
                    setFormulario(true);
                    console.log(values);
                    setTimeout(() => setFormulario(false), 2000);
                }}
                validate={(values) => {
                    let errores: any = {};
                    if (!values.nombre) {
                        errores.nombre = "El nombre es requerido";
                    } else if (/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.nombre) === false) {
                        errores.nombre = "El nombre no es válido";
                    }

                    /*
                    if (!values.correo) {
                        errores.correo = "El correo es requerido";
                    } else if (
                        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                            values.correo
                        ) === false
                    ) {
                        errores.correo = "El correo no es válido";
                    }*/

                    return errores;
                }}
                initialValues={{
                    nombre: "",
                    correo: "",
                    fnacimiento: "",
                    direccion: "",
                    cedula: "",
                    nrepresentante: "",
                    crepresentante: "",
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
                            <label htmlFor="fnac">Fecha de Nacimiento</label>
                            <Field 
                                type="text"
                                name="fnacimiento"
                                id="fnacimiento"
                                placeholder="12/12/1999"
                            />
                            <ErrorMessage
                                name="correo"
                                component={() => <div>{errors.correo}</div>}
                            />
                        </div>

                        <div className={styles.field}>
                        <label htmlFor="direccion">Direccion</label>
                            <Field
                                type="text"
                                name="direccion"
                                id="direccion"
                                placeholder="Av. La Paz"
                            />
                            <ErrorMessage
                                name="correo"
                                component={() => <div>{errors.correo}</div>}
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
                                name="correo"
                                component={() => <div>{errors.correo}</div>}
                            />
                        </div>

                        <div className={styles.field}>
                        <label htmlFor="nrepresentante">Nombre representante</label>
                            <Field
                                type="text"
                                name="nrepresentante"
                                id="nrepresentante"
                                placeholder="Juan Lopez"
                            />
                            <ErrorMessage
                                name="correo"
                                component={() => <div>{errors.correo}</div>}
                            />
                        </div>

                        <div className={styles.field}> 
                        <label htmlFor="crepresentante">Celular representante</label>
                            <Field
                                type="text"
                                name="crepresentante"
                                id="crepresentante"
                                placeholder="0987654321"
                            />
                            <ErrorMessage
                                name="correo"
                                component={() => <div>{errors.correo}</div>}
                            />
                        </div>

                        <button type="submit">Enviar</button>
                        {formulario && <h1>Formulario enviado</h1>}
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default FormularioEstudiantes;