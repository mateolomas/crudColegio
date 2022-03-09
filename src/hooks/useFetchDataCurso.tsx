
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Curso } from '../interfaces/schema';


interface Data {
    data: Curso[];
    loading: boolean;
    error: string;
}


const initialState: Data = {
    data: [] as Curso[],
    loading: true,
    error: undefined
}



const useFetchDataCurso = (): Data => {
    const [data, setData] = useState<Data>(initialState)
    useEffect(() => {

        axios.get(`http://localhost:3002/curso`)
            .then(res => {
                setData({
                    data: res.data,
                    loading: false,
                    error: undefined
                })
            })
            .catch(err => {
                setData({
                    data: [] as Curso[],
                    loading: false,
                    error: err
                })
            })

    }, [])

    return data
}



export default useFetchDataCurso