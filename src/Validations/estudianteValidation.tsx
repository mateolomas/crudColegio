import * as yup from 'yup';

export const estudianteValidation = yup.object().shape({
    nombre: yup.string().required('El nombre es requerido'),
    fechaNacimiento: yup.string().required('La fecha de nacimiento es requerida'),
    direccionDomiciliaria: yup.string().required('La direccion es requerida'),
    cedula: yup.string().required('La cedula es requerida'),
    nombreRepresentante: yup.string().required('El nombre del representante es requerido'),
    celularRepresentante: yup.string().required('La cedula del representante es requerido'),
});



