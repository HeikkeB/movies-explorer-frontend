import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import imgCard from '../../images/img_card.png'
import './MoviesCard.css'

export default function MoviesCard() {
  const [like, setLike] = useState(false)
  const location = useLocation()
  return (
    <li className='movies-card'>
      <div className='movies-card__container'>
      <a href='https://www.youtube.com/' target='_blank' rel='noreferrer'>
        <img className='movies-card__img' src={imgCard} alt={imgCard.nameRU}/>
      </a>
        <div className='movies-card__info'>
          <div className='movies-card__info-text'>
            <h3 className='movies-card__title'>{'Бег это свобода'}</h3>
            <p className='movies-card__duration'>{'1ч 44м'}</p>
          </div>
          {
          location.pathname === '/movies' && (
            <button
              onClick={()=> setLike(!like)}
              className={ like ? 'movies-card__like_active animation-link' : 'movies-card__like animation-link'} type='button' aria-label="Нравится">
            </button>
          )}
          {
            location.pathname === '/saved-movies' && (
              <button               
                className='movies-card__remove animation-link' type='button' aria-label="Удалить">
              </button>
            )}
        </div>
      </div>
    </li>
  )
}
