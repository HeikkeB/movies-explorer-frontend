import React from 'react'
import './Promo.css'
import logo from '../../images/landing-logo.svg'

export default function Promo() {
  return (
    <section className='promo'>
        <div className='promo__container'>
        <div className='promo__content'>
                <h1 className='promo__left-item-title'>Учебный проект студента факультета Веб-разработки.</h1>
                <p className='promo__left-item-description'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <a className='promo__left-item-link' href='https://goo.su/P65u' target='_black'>Узнать больше</a>
        </div>
            <img className='promo_img' src={logo} alt='Earth'></img>
        </div>
    </section>
  )
}
