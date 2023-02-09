import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
import './MoviesCardList.css'

export default function MoviesCardList({ savedMoviesList, moviesList, likeClick, removeLikeClick, loading }) {
  const [ showMoviesList, setShowMoviesList ] = useState([])
  const [showDetails, setShowDetails] = useState({ total: 12, more: 3 })

  const location = useLocation()

  useEffect(() => {
    if(moviesList.length) {
      const res = moviesList.filter((item, i) => i < showDetails.total)
      setShowMoviesList(res)
    }

  }, [moviesList, showDetails.total]);

  useEffect(() => {
    showDetailsList()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', showDetailsList)
    }, 300)
  },[])

  function showDetailsList() {
    const display = window.innerWidth
    if(display > 996) {
      setShowDetails({total: 12, more: 3})
    } 
    if (display < 996) {
      setShowDetails({total: 8, more: 2})
    }
    if (display < 629) {
      setShowDetails({total: 5, more: 2})
    }
  }

  function handleMoreBtn() {
    const start = showMoviesList.length
    const end = start + showDetails.more
    const more = moviesList.length - start

    if(more > 0) {
      const newMovies = moviesList.slice(start, end)
      setShowMoviesList([...showMoviesList, ...newMovies])
    }
  }

  function getSavedMovies(array, movie) {
    return array.find((item) => {
      return item.movieId === (movie.id || movie.movieId)
    })
  }

  return (
    <section className='movies-card-list'>
    {loading ? <Preloader /> : (
      <>
        <ul className='movies-card-list__list'>
          {showMoviesList.map((movie) => (
            <MoviesCard
              key={movie.id || movie._id}
              movie={movie}
              savedMovies={getSavedMovies(savedMoviesList, movie)}
              likeClick={likeClick}
              removeLikeClick={removeLikeClick}
            />
          ))}
        </ul>
        {
          location.pathname === '/movies' ? (
            moviesList.length > 3 && moviesList.length > showMoviesList.length ? (
              <button className='movies__yet-btn animation-btn' onClick={handleMoreBtn}>Ещё</button>
              ) : (undefined)       
          ) : (undefined)   
        }
      </>
    )}
    </section>
  )
}
