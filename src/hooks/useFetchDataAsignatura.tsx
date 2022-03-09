
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Asignatura, Curso } from '../interfaces/schema';


interface Data {
    data: Asignatura[];
    loading: boolean;
    error: string;
}


const initialState: Data = {
    data: [] as Asignatura[],
    loading: true,
    error: undefined
}



const useFetchDataCurso = (): Data => {
    const [data, setData] = useState<Data>(initialState)
    useEffect(() => {

        axios.get(`http://localhost:3002/asignatura`)
            .then(res => {
                setData({
                    data: res.data,
                    loading: false,
                    error: undefined
                })
            })
            .catch(err => {
                setData({
                    data: [] as Asignatura[],
                    loading: false,
                    error: err
                })
            })

    }, [])

    return data
}



export default useFetchDataCurso