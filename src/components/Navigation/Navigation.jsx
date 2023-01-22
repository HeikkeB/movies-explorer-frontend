import React from 'react'
import { Link } from 'react-router-dom'
import NavTab from '../NavTab/NavTab'
import './Navigation.css'
import headerLogo from '../../images/header_logo.svg'

export default function Navigation() {
  return (
    <section className='navigation'>
    <div className='navigation__container'>
        <Link to='/' className='navigation__logo-link'>
            <img className='navigation__logo' src={headerLogo} alt='логотип'></img>
        </Link>        
        <NavTab />
    </div>
    </section>
  )
}
