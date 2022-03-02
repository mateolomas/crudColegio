import React from 'react'
import Link from 'next/link'
import styles from '../styles/header.module.css'

function Header() {
  return (
    <>
    <div className={styles.header} >
      
        
      <div className='logo'></div>
    
      <nav className={styles.navbar}>
      <Link href='/estudiantes'>
        <a>Estudiantes</a>
      </Link>
      <Link href='/cursos'>
        <a>Cursos</a>
      </Link>
      <Link href='/profesores'>
        <a>Profesores</a>
      </Link>
      <Link href="/">
      <a>Home Page</a>
        </Link>

      </nav>
      
    </div>
    </>
  )
}

export default Header