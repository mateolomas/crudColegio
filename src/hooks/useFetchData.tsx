import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'


//genericos 

const useFetchData = (tipo: String): any[] => {
    const [data, setData] = useState([])

    const fetchData = async () => {
        const res = await axios.get(`http://localhost:3002/${tipo}`)
        setData(res.data)

        
    }
    
useEffect(() => {
    fetchData();
},[])

  return data 
}


export default useFetchData