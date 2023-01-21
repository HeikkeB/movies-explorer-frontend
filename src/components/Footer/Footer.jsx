import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className='footer'>
        <div className='footer__container'>
            <p className='footer__descrition'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className='footer__line'></div>
            <div className='footer__content'>
                <p className='footer__year'>© 2023</p>
                <div className='footer__links'>
                    <a className='footer__link' href='https://practicum.yandex.ru/' target='_blank' rel='noreferrer'>Яндекс.Практикум</a>
                    <a className='footer__link' href='https://github.com/HeikkeB' target='_blank' rel='noreferrer'>Github</a>
                </div>
            </div>
        </div>
    </footer>
  )
}
