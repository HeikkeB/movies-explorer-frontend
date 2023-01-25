import { useState } from 'react'
import imgCard from '../../images/img_card.png'
import './MoviesCard.css'


export default function MoviesCard() {
  const [like, setLike] = useState(false)
  return (
    <li className='movies-card'>
      <div className='movies-card__container'>
        <img className='movies-card__img' src={imgCard} alt={imgCard.nameRU}/>
        <div className='movies-card__info'>
          <div className='movies-card__info-text'>
            <h3 className='movies-card__title'>{'Бег это свобода'}</h3>
            <p className='movies-card__duration'>{'1ч 44м'}</p>
          </div>
          <button onClick={()=> setLike(!like)} className={ like ? 'movies-card__like_active' : 'movies-card__like' } type='button' aria-label="Нравится">
          </button>
        </div>
      </div>
    </li>
  )
}
