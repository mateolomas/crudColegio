import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../src/components/Header'
import Link from 'next/link'
import Main from '../src/components/Main'



const Home: NextPage = () => {
  return (
    <> 
    <Header />
    <Main />
    </>
  )
}

export default Home
