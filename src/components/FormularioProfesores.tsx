import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useState } from "react";

const FormularioProfesores = () => {
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

                        <div>
                        <label htmlFor="direccion">Direccion domiciliaria</label>
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

                        <div>
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

                        <div>
                        <label htmlFor="nrepresentante">Celular</label>
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

                        <div>
                        <label htmlFor="crepresentante">Correo</label>
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

export default FormularioProfesores;