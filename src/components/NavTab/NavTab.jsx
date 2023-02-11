import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './NavTab.css'
import burgerMenu from '../../images/menu3line.svg'
import burgerMenuCross from '../../images/menu_cross_32.svg'

export default function NavTab() {
  const [isBurgerOpen, setBurgerOpen] = useState(false)
  return (
    <nav className={ isBurgerOpen ? 'navtab_active' : 'navtab' }>
        <div className={ isBurgerOpen ? 'navtab__menu active' : 'navtab__menu' }>
          <div className='navtab__pages'>
              <NavLink
                to='/'
                  className={({ isActive }) => 
                  isActive ? 'navtab__link-mobile_active' : 'navtab__link-mobile animation-link'}>
                    Главная
              </NavLink>
              <NavLink 
                to='/movies'
                  className={({ isActive }) => 
                  !isActive ? 'navtab__link_active  animation-link' : 'navtab__link'}>
                    Фильмы
              </NavLink>
              <NavLink 
                to='/saved-movies'
                  className={({ isActive }) => 
                  !isActive ? 'navtab__link_active  animation-link' : 'navtab__link'}>
                    Сохранённые фильмы
              </NavLink>
          </div>
          <Link className='navtab__link-account animation-btn' to='/profile'>Аккаунт</Link>
        </div>
        <div onClick={() => setBurgerOpen(!isBurgerOpen)} className='navtab__burger'>
        { isBurgerOpen ?
          (<img className='navtab__burgerMenuCross animation-link' src={burgerMenuCross} alt='закрыть' />
          ) : (
          <img className='navtab__burgerMenu animation-link' src={burgerMenu} alt='меню' />) }
        </div>
    </nav>
  )
}
