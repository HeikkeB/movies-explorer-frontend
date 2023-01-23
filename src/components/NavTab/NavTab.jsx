import React from 'react'
import { Link } from 'react-router-dom'
import './NavTab.css'

export default function NavTab() {
  return (
    <nav className='navtab'>
        <div className='navtab__pages'>
            <Link className='navtab__link' to='/movies'>Фильмы</Link>
            <Link className='navtab__link' to='/saved-movies'>Сохранённые фильмы</Link>
        </div>
        <Link className='navtab__link-account' to='/profile'>Аккаунт</Link>
    </nav>
  )
}
