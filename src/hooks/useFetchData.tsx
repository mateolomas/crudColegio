
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Data, Estudiante } from '../interfaces/schema';


const initialState: any = {
    data: [],
    loading: true,
    error: undefined
}



const useFetchData = (tipo: String): any => {
    const [data, setData] = useState(initialState)
    useEffect(() => {

        axios.get(`http://localhost:3002/${tipo}`)
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



export default useFetchData