import { useContext, useState, useEffect } from 'react'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import { filterShortMovies, filterMovies } from '../../utils/utils'
import './SavedMovies.css'
import { currentUserContext } from '../../context/CurrentUserContext';

export default function SavedMovies({ savedMoviesList, removeLikeClick }) {

  const currentUser = useContext(currentUserContext);
  const [shortMovies, setShortMovies] = useState(false)
  const [showMovies, setShowMovies] = useState(savedMoviesList)
  const [filterSearchMovies, setFilterSearchMovies] = useState(showMovies)
  const [NotFound, setNotFound] = useState(false)
  
  useEffect(() => {
    setFilterSearchMovies(savedMoviesList)
    savedMoviesList.length !== 0 ? setNotFound(false) : setNotFound(true)
  }, [savedMoviesList])

  
  function handleSearchSubmit(inputValue) {
    const moviesList = filterMovies(savedMoviesList, inputValue, shortMovies)

    if(moviesList.length === 0) {
      setNotFound(true)
    } else {
      setNotFound(false)
      setFilterSearchMovies(moviesList)
      setShowMovies(moviesList)
    }
  }


  return (
    <section className='saved-movies'>
        <SearchForm
          handleSearchSubmit={handleSearchSubmit}
          shortMovies={shortMovies}
        />
        <MoviesCardList
          moviesList={showMovies}
          savedMoviesList={savedMoviesList}
          removeLikeClick={removeLikeClick}
        />
    </section>
  )
}
