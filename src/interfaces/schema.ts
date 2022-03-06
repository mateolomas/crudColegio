export interface Data {
    data: Estudiante[],
    loading: boolean;
    error: any;
}


export interface Schema {
    colegio:          Colegio[];
    profesor:         Profesor[];
    estudiante:       Estudiante[];
    asignatura:       Asignatura[];
    curso:            Curso[];
    cursoEstudiantes: CursoEstudiante[];
}

export interface Asignatura {
    id: number;
    idColegio: number;
    nombre:    string;
}

export interface Colegio {
    id:                 number;
    nombre:             string;
    direccion:          string;
    fechaInscripcion:   string;
    nombreRepresentate: string;
}

export interface Curso {
    id:            number;
    idAsignatura:         number;
    idProfesor:           number;
    capacidadEstudiantes: number;
    fechaInicio:          string;
    fechaFin:             string;
}

export interface CursoEstudiante {
    idCurso:      number;
    idEstudiante: number;
}

export interface Estudiante {
    id:                    number;
    nombre:                string;
    fechaNacimiento:       string;
    direccionDomiciliaria: string;
    cedula:                string;
    celularRepresentante:  string;
    nombreRepresentante:   string;
}

export interface Profesor {
    id:                   number;
    nombre:               string;
    direccionDomicilaria: string;
    fechaNacimiento:      string;
    cedula:               number;
    celular:              string;
    correo:               string;
}
