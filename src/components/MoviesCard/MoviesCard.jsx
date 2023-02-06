import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import './MoviesCard.css'

export default function MoviesCard({savedMovies, likeClick, movie }) {
  const [like, setLike] = useState(false)
  const location = useLocation()

  function changeDuration(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    if(hours === 0) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }

  function handleLikeClick() {
    likeClick(movie)
  }

  

  return (
    <li className='movies-card'>
      <div className='movies-card__container'>
      <a href={movie.trailerLink} target='_blank' rel='noreferrer' className='movies-card__link-img'>
        <img className='movies-card__img' src={`https://api.nomoreparties.co/${movie.image.url}`} alt={movie.nameRU}/>
      </a>
        <div className='movies-card__info'>
          <div className='movies-card__info-text'>
            <h3 className='movies-card__title'>{movie.nameRU}</h3>
            <p className='movies-card__duration'>{changeDuration(movie.duration)}</p>
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
