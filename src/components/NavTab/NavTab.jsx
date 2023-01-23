import { useState } from 'react'
import { Link } from 'react-router-dom'
import './NavTab.css'
import burgerMenu from '../../images/burger_menu.svg'
import burgerMenuCross from '../../images/burger_menu_cross.svg'

export default function NavTab() {
  const [isBurgerOpen, setBurgerOpen] = useState(false)
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
