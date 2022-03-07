import React, { useEffect } from 'react'
import axios from 'axios'

const usePostData = (value: {}, person: string) => {
    axios.post(`http://localhost:3002/${person}`, value)
      useEffect(() => {
        usePostData(value, person);
    }, [value])
     
}



export default usePostData
