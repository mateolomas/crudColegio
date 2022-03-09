import * as yup from 'yup';
import { date } from 'yup/lib/locale';

export const profesorValidation = yup.object().shape({


    nombre: yup.string()
        .required("Nombre es requerido")
        .matches(/^[aA-zZ\s]+$/, "Solo letras son permitidas"),
    correo: yup.string()
        .email("Invalid email address")
        .required("Required"),
    fechaNacimiento: yup.date().max(new Date(), "Eres un viajero del tiempo?!").required("Fecha de nacimiento es requerida"),
    direccionDomicilaria: yup.string().required("Direccion domiciliaria es requerida"),
    cedula: yup.string()
        .required()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits'),
    celular: yup.string()
        .required()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits')



});



