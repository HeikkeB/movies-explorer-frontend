import React from 'react'
import './Techs.css'

export default function Techs() {
  return (
    <section className='techs'>
        <div className='techs__container'>
            <h2 className='startpage-block__title'>Технологии</h2>
            <div className='techs__borderline'></div>
            <div className='techs__content'>
                <h3 className='techs__content-title'>7 технологий</h3>
                <p className='techs__content-description'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            </div>
           <ul className='techs__info'>
                <li className='techs__info-item'>
                    <p className='techs__info-item-title'>HTML</p>
                </li>
                <li className='techs__info-item'>
                    <p className='techs__info-item-title'>CSS</p>
                </li>
                <li className='techs__info-item'>
                    <p className='techs__info-item-title'>JS</p>
                </li>
                <li className='techs__info-item'>
                    <p className='techs__info-item-title'>React</p>
                </li>
                <li className='techs__info-item'>
                    <p className='techs__info-item-title'>Git</p>
                </li>
                <li className='techs__info-item'>
                    <p className='techs__info-item-title'>Express.js</p>
                </li>
                <li className='techs__info-item'>
                    <p className='techs__info-item-title'>MongoDB</p>
                </li>
           </ul>
        </div>
    </section>
  )
}
