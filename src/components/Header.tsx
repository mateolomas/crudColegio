import React from 'react'
import Link from 'next/link'
import styles from '../styles/header.module.css'
import Image from 'next/image'
import logo from '../assets/logonext.png'


function Header() {
  return (
    <>
      <div className={styles.header} >


        <div className='logo'>
          <Image
            src={logo}
            alt="Picture of the author"
            width={100}
            height={50}
          />
        </div>

        <nav className={styles.navbar}>
          <Link href='/Estudiantes'>
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