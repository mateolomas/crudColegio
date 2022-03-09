import axios from 'axios';
import { useState, useEffect } from 'react';
import { Curso, Asignatura, Profesor, CursosData } from '../interfaces/schema';


interface Data {
    data: CursosData[]
    loading: boolean
    error: string
}

function useFetchDataAll(id?: any): Data {

    const [data, setData] = useState<CursosData[]>();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const getData = async () => {

        try {
            setLoading(true);
            const url = id ? `http://localhost:3002/curso?id=${id}` : 'http://localhost:3002/curso';

            const response = await axios.get<Curso[]>(url);
            const curso: Curso[] = response.data;

            const asignatura = curso.map(
                async (curso: Curso) => {
                    const response = await axios.get<Asignatura>(`http://localhost:3002/asignatura?id=${curso.idAsignatura}`);
                    const asignatura: Asignatura = response.data[0];

                    const response2 = await axios.get<Profesor>(`http://localhost:3002/profesor?id=${curso.idProfesor}`);
                    const profesor: Profesor = response2.data[0];

                    return { curso, asignatura, profesor };

                }
            )
            const data: CursosData[] = await Promise.all(asignatura);
            setLoading(false);
            setData(data);



        } catch (error) {
            setError("error.message");
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        getData();
    }, []);


    return { data, loading, error };
}


export default useFetchDataAll;
