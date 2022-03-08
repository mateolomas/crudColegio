import * as yup from 'yup';

export const profesorValidation = yup.object().shape({


    nombre: yup.string().required(),
    correo: yup.string().required(),
    fechaNacimiento: yup.string().required(),
    direccionDomicilaria: yup.string().required(),
    cedula: yup.number().required(),
    celular: yup.string().required(),


});



