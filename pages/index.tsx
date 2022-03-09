import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../src/styles/Home.module.css'
import Header from '../src/components/Header'
import Link from 'next/link'
import Main from '../src/components/Main'



const Home: NextPage = () => {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <Main />
      </div>
    </>
  )
}

export default Home
