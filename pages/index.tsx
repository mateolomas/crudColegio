import type { NextPage } from 'next'
import styles from '../src/styles/Home.module.css'
import Header from '../src/components/Header'
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
