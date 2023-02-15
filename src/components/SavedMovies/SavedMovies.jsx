import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import { filterShortMovies, filterMovies } from '../../utils/utils'
import './SavedMovies.css'
import { currentUserContext } from '../../context/CurrentUserContext';
import NotFoundSearch from '../NotFoundSearch/NotFoundSearch'

export default function SavedMovies({ savedMoviesList, removeLikeClick }) {

  const currentUser = useContext(currentUserContext);
  const [shortMovies, setShortMovies] = useState(false)
  const [filterSearchMovies, setFilterSearchMovies] = useState(savedMoviesList)
  const [searchQuery, setSearchQuery] = useState('')
  const [notFound, setNotFound] = useState(false)
  
  const history = useNavigate()

  useEffect(() => {
    if(history) {
      setShortMovies(false)
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, false)
    }
  }, [currentUser.email, history])

  useEffect(() => {
    const moviesList = filterMovies(savedMoviesList, searchQuery)
    setFilterSearchMovies(shortMovies ? filterShortMovies(moviesList) : moviesList)
  }, [savedMoviesList, searchQuery, shortMovies])

  useEffect(() => {
    if(filterSearchMovies.length === 0) {
      setNotFound(true)
    } else {
      setNotFound(false)
    }
  }, [filterSearchMovies])

  function handleSearchSubmit(inputValue) {
    setSearchQuery(inputValue)
  }

  function handleShortMovies() {
    setShortMovies(!shortMovies)
  }

  return (
    <section className='saved-movies'>
        <SearchForm
          searchMovies={handleSearchSubmit}
          shortMovies={shortMovies}
          filteredShortMovies={handleShortMovies}
        />
        {notFound === true ? 
         <NotFoundSearch />
         : 
        <MoviesCardList
          moviesList={filterSearchMovies}
          savedMoviesList={savedMoviesList}
          removeLikeClick={removeLikeClick}
        />
        }
    </section>
  )
}
