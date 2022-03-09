
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Data, Estudiante } from '../interfaces/schema';


const initialState: Data = {
    data: [] as Estudiante[],
    loading: true,
    error: undefined
}



const useFetchDataEstudiante = (): Data => {
    const [data, setData] = useState<Data>(initialState)
    useEffect(() => {

        axios.get(`http://localhost:3002/estudiante`)
            .then(res => {
                setData({
                    data: res.data,
                    loading: false,
                    error: undefined
                })
            })
            .catch(err => {
                setData({
                    data: [] as Estudiante[],
                    loading: false,
                    error: err
                })
            })

    }, [])

    return data
}



export default useFetchDataEstudiante