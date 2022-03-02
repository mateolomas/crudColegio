import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../src/components/Header'
import Link from 'next/link'



const Home: NextPage = () => {
  return (
    <>
    <Link href='/estudiantes'>
      <a>Estudiantes</a>
    </Link>
    <Link href='/cursos'>
      <a>Cursos</a>
    </Link>
    <Link href='/profesores'>
      <a>Profesores</a>
    </Link>
    <h1> CRUD Colegio </h1>
    <Header />
    </>
  )
}

export default Home
