import * as yup from 'yup';

export const estudianteValidation = yup.object().shape({
    nombre: yup.string()
        .required("Nombre es requerido")
        .matches(/^[aA-zZ\s]+$/, "Solo letras son permitidas"),
    fechaNacimiento: yup.date().max(new Date(), "Eres un viajero del tiempo?!").required("Fecha de nacimiento es requerida"),
    direccionDomiciliaria: yup.string().required('La direccion es requerida'),
    cedula: yup.string()
        .required("Cedula es requerida")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits'),
    nombreRepresentante: yup.string()
        .required("Nombre es requerido")
        .matches(/^[aA-zZ\s]+$/, "Solo letras son permitidas"),
    celularRepresentante: yup.string()
        .required("El celular del representante es requerido")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits')

});



