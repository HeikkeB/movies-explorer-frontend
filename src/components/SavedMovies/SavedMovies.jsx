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

  useEffect(() => {
    if (localStorage.setItem(`${currentUser.email} - shortMovies`, true)) {
      setShortMovies(true)
      setShowMovies(filterShortMovies(savedMoviesList))
    } else {
      setShortMovies(false)
      setShowMovies(savedMoviesList)
    }
  }, [currentUser, savedMoviesList])

  function handleSearchSubmit(inputValue) {
    const moviesList = filterMovies(savedMoviesList, inputValue, shortMovies)

    if(moviesList.length === 0) {
      setNotFound(true)
      console.log('nothing')
    } else {
      setNotFound(false)
      setFilterSearchMovies(moviesList)
      setShowMovies(moviesList)
    }
  }

  function handleShortMovies() {
    if(!shortMovies) {
      setShortMovies(true)
      localStorage.setItem(`${currentUser.email} - shortMovies`, true)
      setShowMovies(filterShortMovies(filterSearchMovies))
    } else {
      setShortMovies(false)
      localStorage.setItem(`${currentUser.email} - shortMovies`, false)
      setShowMovies(filterSearchMovies)
    }
  }

  return (
    <section className='saved-movies'>
        <SearchForm
          searchMovies={handleSearchSubmit}
          shortMovies={shortMovies}
          filteredShortMovies={handleShortMovies}
        />
        <MoviesCardList
          moviesList={showMovies}
          savedMoviesList={savedMoviesList}
          removeLikeClick={removeLikeClick}
        />
    </section>
  )
}
