import * as yup from 'yup';

export const cursoValidation = yup.object().shape({
    idAsignatura: yup.string().required(),
    idProfesor: yup.string().required(),
    capacidadEstudiantes: yup.number().min(5, "Minimo 5 estudiantes").max(50, "Maximo 50").required("Capacidad de estudiantes es requerida"),
    fechaInicio: yup.date().min(new Date(), 'La fecha de inicio no puede ser menor a la actual'),
    fechaFin: yup
        .date()
        .min(
            yup.ref("fechaInicio"),
            "La fecha de fin no puede ser menor a la fecha de inicio"
        ),


});



