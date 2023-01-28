import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <section className='not-found'>
        <div className='not-found__container'>
                <h2 className='not-found__title'>404</h2>
                <p className='not-found__description'>Страница не найдена</p>        
        </div>
            <Link to='/' className='not-found__link'>Назад</Link>
    </section>
  )
}
