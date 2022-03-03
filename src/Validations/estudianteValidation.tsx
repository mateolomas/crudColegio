import * as yup from 'yup';

const estudianteValidation = yup.object().shape({
    nombre: yup.string().required('El nombre es requerido'),
    correo: yup.string().email('El correo no es válido'),
    fnacimiento: yup.string().required('La fecha de nacimiento es requerida'),
    direccion: yup.string().required('La direccion es requerida'),
    cedula: yup.string().required('La cedula es requerida'),
    nrepresentante: yup.string().required('El nombre del representante es requerido'),
    crepresentante: yup.string().required('La cedula del representante es requerido'),
});



