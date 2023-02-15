import React from 'react'
import { useLocation } from 'react-router-dom'
import './MoviesCard.css'
import { changeDuration } from '../../utils/utils'

export default function MoviesCard({savedMovies, likeClick, removeLikeClick, movie }) {
  const location = useLocation()

  function handleLikeClick() {
    likeClick(movie)
  }

  function handleRemoveClick() {
    removeLikeClick(movie)
  }

  return (
    <li className='movies-card'>
      <div className='movies-card__container'>
      <a href={movie.trailerLink} target='_blank' rel='noreferrer' className='movies-card__link-img'>
        <img
          className='movies-card__img'
          src={location.pathname === '/movies' ? (`https://api.nomoreparties.co${movie.image.url}`) : (movie.image)}
          alt={movie.nameRU}
        />
      </a>
        <div className='movies-card__info'>
          <div className='movies-card__info-text'>
            <h3 className='movies-card__title'>{movie.nameRU}</h3>
            <p className='movies-card__duration'>{changeDuration(movie.duration)}</p>
          </div>
          {
          location.pathname === '/movies' && (
            <button
              onClick={savedMovies ? handleRemoveClick : handleLikeClick}
              className={ savedMovies ? 'movies-card__like_active animation-link' : 'movies-card__like animation-link'} type='button' aria-label="Нравится">
            </button>
          )}
          {
            location.pathname === '/saved-movies' && (
              <button               
                className='movies-card__remove animation-link' type='button' aria-label="Удалить" onClick={handleRemoveClick}>
              </button>
            )}
        </div>
      </div>
    </li>
  )
}
