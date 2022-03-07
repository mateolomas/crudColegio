
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Data, Estudiante } from '../interfaces/schema';

const initialState: Data = {
    data: [],
    loading: true,
    error: undefined
}

const useFetchData = (tipo: String): Data => {
    const [data, setData] = useState(initialState)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/${tipo}`)
                setData({
                    data: response.data,
                    loading: false,
                    error: undefined
                })
            } catch (err) {
                setData({
                    data: [] as Estudiante[],
                    loading: false,
                    error: err
                })
            }
        }

        fetchData()
    }

        , [])

    return data
}



export default useFetchData