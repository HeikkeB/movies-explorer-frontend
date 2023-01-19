import React from 'react'
import './AboutMe.css'
import myPhoto from '../../images/myphoto.png'

export default function AboutMe() {
  return (
   <section className='about-me'>
    <div className='about-me__container'>
        <h2 className='about-me__title'>Студент</h2>
        <div className='about-me__blackline'></div>
        <div className='about-me__content'>
            <div className='about-me__content-text'>
                <h3 className='about-me__content-name'>Виталий</h3>
                <p className='about-me__content-title'>Фронтенд-разработчик, 30 лет</p>
                <p className='about-me__content-description'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
                                                            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
                                                            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, 
                                                            начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                <a className='about-me__content-link' href='https://github.com/HeikkeB' target='_blank' rel="noreferrer">Github</a>
            </div>
            <img className='about-me__photo' src={myPhoto} alt='my photography'></img>
        </div>
        <div className='about-me__portfolio'>
        <h2 className='about-me__portfolio-title'>Портфолио</h2>
            <ul className='about-me__portfolio-list'>
                <li className='about-me__portfolio-item'>
                    <a className='about-me__portfolio-link' href='https://github.com/HeikkeB' target='_blank' rel="noreferrer">Статичный сайт</a>
                </li>
                <li className='about-me__portfolio-item'>
                    <a className='about-me__portfolio-link' href='https://github.com/HeikkeB' target='_blank' rel="noreferrer">Адаптивный сайт</a>
                </li>
                <li className='about-me__portfolio-item'>
                    <a className='about-me__portfolio-link' href='https://github.com/HeikkeB' target='_blank' rel="noreferrer">Одностраничное приложение</a>
                </li>
            </ul>
        </div>
    </div>
   </section>
  )
}
