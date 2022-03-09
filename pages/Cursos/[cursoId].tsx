import Layout from "../../src/components/Layout";
import {
    Curso,
    Estudiante,
    CursoEstudiante,
    Profesor,
    Asignatura,
} from "../../src/interfaces/schema";
import button from "../../src/styles/button.module.css";
import styles from "../../src/styles/table.module.css";
import axios from "axios";

interface Props {
    data: Curso;
    dataEstudiantesCurso: CursoEstudiante[];
    estudiantes: Estudiante[];
    dataProfesor: Profesor;
    dataAsignatura: Asignatura;
}

const CursoPage = ({
    data: curso,
    dataEstudiantesCurso,
    estudiantes,
    dataProfesor,
    dataAsignatura,
}: Props) => {
    {
        console.log(dataAsignatura);
    }
    return (
        <>
            <Layout>
                <div>
                    <h1>Informacion del Curso</h1>
                    Curso: {curso.id}
                </div>
                <table className={styles.tabla}>
                    <thead>
                        <tr className={styles.encabezado}>
                            <th>ID</th>
                            <th>Asignatura</th>
                            <th>profesor</th>
                            <th>Capacidad Estudiantes</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={styles.valuestr}>
                            <td>{curso.id}</td>
                            <td>{dataAsignatura.nombre}</td>
                            <td>{dataProfesor.nombre}</td>
                            <td>{curso.capacidadEstudiantes}</td>
                            <td>{curso.fechaInicio}</td>
                            <td>{curso.fechaFin}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button className={button.buttonInfo}>
                        Agregar estudiantes a curso
                    </button>
                </div>

                <div>
                    <h2> Profesor Info</h2>
                    <table className={styles.tabla}>
                        <thead>
                            <tr className={styles.encabezado}>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Direccion Domicilaria</th>
                                <th>Fecha de Nacimiento</th>
                                <th>Cedula</th>
                                <th>Celular</th>
                                <th>Correo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={styles.valuestr}>
                                <td>{dataProfesor.id}</td>
                                <td>{dataProfesor.nombre}</td>
                                <td>{dataProfesor.direccionDomicilaria}</td>
                                <td>{dataProfesor.fechaNacimiento}</td>
                                <td>{dataProfesor.cedula}</td>
                                <td>{dataProfesor.celular}</td>
                                <td>{dataProfesor.correo}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                    <h2>Lista de estudiantes</h2>
                </div>

                <table className={styles.tabla}>
                    <thead>
                        <tr className={styles.encabezado}>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Direccion Domiciliaria</th>
                            <th>Cedula</th>
                            <th>Nombre representate</th>
                            <th>Celular representate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estudiantes.map((estudiante: Estudiante) => (
                            <tr className={styles.valuestr} key={estudiante.id}>
                                <td>{estudiante.id}</td>
                                <td>{estudiante.nombre}</td>
                                <td>{estudiante.fechaNacimiento}</td>
                                <td>{estudiante.direccionDomiciliaria}</td>
                                <td>{estudiante.cedula}</td>
                                <td>{estudiante.nombreRepresentante}</td>
                                <td>{estudiante.celularRepresentante}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Layout>
        </>
    );
};

export async function getServerSideProps(context: any) {
    const res = await axios.get<Curso>(
        `http://localhost:3002/curso/${context.query.cursoId}`
    );
    const data = res.data;

    const ListEstudent = await axios.get<CursoEstudiante[]>(
        `http://localhost:3002/cursoEstudiantes?idCurso=${context.query.cursoId}`
    );
    const dataEstudiantesCurso: CursoEstudiante[] = ListEstudent.data;

    const estudiantesIdList = dataEstudiantesCurso.map(
        (estudiante: CursoEstudiante) => {
            return estudiante.idEstudiante;
        }
    );

    const estudiantes: Estudiante[] = [];
    for (const id of estudiantesIdList) {
        const res = await axios.get<Estudiante>(
            `http://localhost:3002/estudiante/${id}`
        );
        const data = res.data;
        estudiantes.push(data);
    }

    const profesorInfo = await axios.get<Profesor>(
        `http://localhost:3002/profesor/${data.idProfesor}`
    );
    const dataProfesor: Profesor = profesorInfo.data;

    const asignaturaInfo = await axios.get<Asignatura>(
        `http://localhost:3002/asignatura/${data.idAsignatura}`
    );
    const dataAsignatura: Asignatura = asignaturaInfo.data;

    return {
        props: {
            data,
            dataEstudiantesCurso,
            estudiantes,
            dataProfesor,
            dataAsignatura,
        },
    };
}

export default CursoPage;
