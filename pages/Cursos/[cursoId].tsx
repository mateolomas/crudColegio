
import { useRouter } from "next/router"
import Layout from "../../src/components/Layout"
import { Curso, Estudiante, CursoEstudiante, Profesor } from '../../src/interfaces/schema';
import button from "../../src/styles/button.module.css"
import styles from "../../src/styles/table.module.css"
import axios from "axios"

const CursoPage = ({ data: curso, dataEstudiantesCurso, estudiantes, dataProfesor }: any) => {

    //const router = useRouter()
    //const { cursoId } = router.query

    { console.log(estudiantes) }
    return (
        <>
            <Layout >
                <div>
                    <h1>Informacion del Curso</h1>
                    Curso: {curso.id}
                </div>
                <table className={styles.tabla}>
                    <thead>
                        <tr className={styles.encabezado}>
                            <th>ID</th>
                            <th>Id Asignatura</th>
                            <th>Id profesor</th>
                            <th>Capacidad Estudiantes</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={styles.valuestr}>
                            <td>{curso.id}</td>
                            <td>{curso.idAsignatura}</td>
                            <td>{curso.idProfesor}</td>
                            <td>{curso.capacidadEstudiantes}</td>
                            <td>{curso.fechaInicio}</td>
                            <td>{curso.fechaFin}</td>
                        </tr>

                    </tbody>

                </table>
                <div>
                    <button className={button.buttonInfo}>Agregar estudiantes a curso</button>
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


                    </table>



                </div>

                <div>
                    <h2>Lista de estudiantes</h2>
                </div>

                <table className={styles.tabla}>
                    <thead>
                        <tr className={styles.encabezado} >
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
    )
}


export async function getServerSideProps(context: any) {


    const res = await fetch(`http://localhost:3002/curso/${context.query.cursoId}`)
    const data = await res.json()

    const ListEstudent = await axios.get<CursoEstudiante[]>(`http://localhost:3002/cursoEstudiantes?idCurso=${context.query.cursoId}`)
    const dataEstudiantesCurso: CursoEstudiante[] = ListEstudent.data


    const estudiantesIdList = dataEstudiantesCurso.map((estudiante: CursoEstudiante) => {
        return estudiante.idEstudiante
    })

    const estudiantes: Estudiante[] = []
    for (const id of estudiantesIdList) {
        const res = await fetch(`http://localhost:3002/estudiante/${id}`)
        const data = await res.json()
        estudiantes.push(data)
    }

    const profesorInfo = await fetch(`http://localhost:3002/profesor/${data.idProfesor}`)
    const dataProfesor: Profesor = await profesorInfo.json()












    return {
        props: {
            data, dataEstudiantesCurso, estudiantes, dataProfesor
        }
    }

}

export default CursoPage