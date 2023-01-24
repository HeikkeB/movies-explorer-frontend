import { useState } from 'react'
import { Link } from 'react-router-dom'
import './NavTab.css'
import burgerMenu from '../../images/menu3line.svg'
import burgerMenuCross from '../../images/menu_cross_32.svg'

export default function NavTab() {
  const [isBurgerOpen, setBurgerOpen] = useState(false)
  return (
    <nav className={ isBurgerOpen ? 'navtab_active' : 'navtab' }>
        <div className={ isBurgerOpen ? 'navtab__menu active' : 'navtab__menu' }>
          <div className='navtab__pages'>
              <Link className='navtab__link-mobile' to='/'>Главная</Link>
              <Link className='navtab__link' to='/movies'>Фильмы</Link>
              <Link className='navtab__link' to='/saved-movies'>Сохранённые фильмы</Link>
          </div>
          <Link className='navtab__link-account' to='/profile'>Аккаунт</Link>
        </div>
        <div onClick={() => setBurgerOpen(!isBurgerOpen)} className='navtab__burger'>
        { isBurgerOpen ? <img className='navtab__burgerMenuCross' src={burgerMenuCross} alt='закрыть' /> : <img className='navtab__burgerMenu' src={burgerMenu} alt='меню' /> }  
        </div>
    </nav>
  )
}
