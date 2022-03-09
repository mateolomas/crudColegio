
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Profesor } from '../interfaces/schema';


interface Data {
    data: Profesor[];
    loading: boolean;
    error: string;

}

const initialState: Data = {
    data: [] as Profesor[],
    loading: true,
    error: undefined
}



const useFetchDataProfesor = (): Data => {
    const [data, setData] = useState<Data>(initialState)
    useEffect(() => {

        axios.get(`http://localhost:3002/profesor`)
            .then(res => {
                setData({
                    data: res.data,
                    loading: false,
                    error: undefined
                })
            })
            .catch(err => {
                setData({
                    data: [] as Profesor[],
                    loading: false,
                    error: err
                })
            })

    }, [])

    return data
}



export default useFetchDataProfesor