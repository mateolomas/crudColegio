import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const useFetchData = (tipo: String): Object => {
    const [data, setData] = useState([])

    const fetchData = async () => {
        const res = await axios.get(`http://localhost:3001/${tipo}`)
        setData(res.data)

        
    }
    
useEffect(() => {
    fetchData();
},[])

  return data 
}


export default useFetchData