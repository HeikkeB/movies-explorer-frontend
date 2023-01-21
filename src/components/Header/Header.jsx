import React from 'react'
import { Link } from 'react-router-dom'
import headerLogo from '../../images/header_logo.svg'
import './Header.css'
import Navigation from '../Navigation/Navigation'

export default function Header({ loggedIn }) {
  return (
   <>
    {(loggedIn) ? (<Navigation />) : (
        <header className='header'>
            <Link to='/'>
                <img className='header__logo' src={headerLogo} alt='логотип'></img>
            </Link>
            <nav className='header__menu'>
                <Link className='header__register' to='/signup'>Регистрация</Link>
                <Link className='header__login' to='/signin'>Войти</Link>
            </nav>
        </header>
    )}
   </>
  )
}
