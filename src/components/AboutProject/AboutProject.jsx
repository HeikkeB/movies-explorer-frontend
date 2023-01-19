import React from 'react'
import './AboutProject.css'

export default function AboutProject() {
  return (
    <section className='about-project'>
    <div className='about-project__container'>
        <h1 className='about-project__title'>О проекте</h1>
        <div className='about-project__blackline'></div>
        <div className='about-project__content'>
                <div className='about-project__info'>
                    <h3 className='about-project__info-title'>Дипломный проект включал 5 этапов</h3>
                    <p className='about-project__info-description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className='about-project__info'>
                    <h3 className='about-project__info-title'>На выполнение диплома ушло 5 недель</h3>
                    <p className='about-project__info-description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
        </div>
        <div className='about-project__line'>
        <div className='about-project__line-content'>
            <div className='about-project__line-backend'>
                <p className='about-project__line-title_black'>1 неделя</p>
            </div>
            <p className='about-project__line-description'>Back-end</p>
        </div>
        <div className='about-project__line-content'>
            <div className='about-project__line-frontend'>
                <p className='about-project__line-title_white'>4 неделя</p>
            </div>
            <p className='about-project__line-description'>Front-end</p>
        </div>
        </div>
    </div>
    </section>
  )
}

