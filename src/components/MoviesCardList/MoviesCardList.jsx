import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
import './MoviesCardList.css'
import { SHOWDISPLAY, DESKTOP, MOBILE } from '../../utils/constants'

export default function MoviesCardList({ savedMoviesList, moviesList, likeClick, removeLikeClick, loading }) {
  const [ showMoviesList, setShowMoviesList ] = useState([])
  const [showDetails, setShowDetails] = useState(SHOWDISPLAY.large)

  const location = useLocation()

  useEffect(() => {
    if(moviesList.length) {
      const res = moviesList.filter((item, i) => i < showDetails.total)
      setShowMoviesList(res)
    }

  }, [moviesList, showDetails.total]);

  useEffect(() => {
    if(location.pathname === '/movies') {
      showDetailsList()
    } else if(location.pathname === '/saved-movies') {
      setShowDetails({total: savedMoviesList.length})
    }
  }, [location.pathname, savedMoviesList.length])

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', showDetailsList)
    }, 300)

    return () => {
      window.removeEventListener('resize', showDetailsList)
    }
  },[])

  function showDetailsList() {
    const display = window.innerWidth
    if(location.pathname === '/movies') {
      if(display > DESKTOP) {
        setShowDetails(SHOWDISPLAY.large)
      } 
      if (display < DESKTOP) {
        setShowDetails(SHOWDISPLAY.medium)
      }
      if (display < MOBILE) {
        setShowDetails(SHOWDISPLAY.small)
      }
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
