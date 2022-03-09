import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { profesorValidation } from "../Validations/profesorValidation";
import { Profesor } from '../interfaces/schema';
interface FormProps {
    handleModalClose: () => void
    profesorSelected: Profesor
    handleCreateProfesor: (profesor: Profesor) => void
    handleEditProfesor: (profesor: Profesor) => void

}


const FormularioProfesores = ({ handleModalClose, profesorSelected, handleCreateProfesor, handleEditProfesor }: FormProps) => {

    const defaultProfesor: Profesor = {
        id: 0,
        nombre: "",
        direccionDomicilaria: "",
        fechaNacimiento: "",
        cedula: 0,
        celular: "",
        correo: ""
    }

    const initialValues = profesorSelected || defaultProfesor;


    return (
        <>
            <Formik
                onSubmit={(values, { resetForm }) => {
                    resetForm();
                    handleModalClose();
                    if (profesorSelected.nombre === ""
                        && profesorSelected.direccionDomicilaria === "" &&
                        profesorSelected.fechaNacimiento === ""
                        && profesorSelected.cedula === 0 &&
                        profesorSelected.celular === "" &&
                        profesorSelected.correo === "") {
                        handleCreateProfesor(values);
                    }
                    else {
                        handleEditProfesor(values);
                    }

                }}

                validationSchema={profesorValidation}

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