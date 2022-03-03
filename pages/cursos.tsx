import React from 'react'
import Layout from '../src/components/Layout'
import useFetchData from '../src/hooks/useFetchData';

const cursos = () => {

  const data = useFetchData('curso');

  
  return (
    <Layout>
    <div>Cursos</div>
    </Layout>

  )
}

export default cursos