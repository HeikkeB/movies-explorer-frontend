import { useState, useContext, useEffect } from 'react'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import './Movies.css'
import { currentUserContext } from '../../context/CurrentUserContext'
import { moviesApi } from '../../utils/MoviesApi' 

export default function Movies({ likeClick, savedMoviesList }) {
  const [shortMovies, setShortMovies] = useState(false)
  const [initialMovies, setInitialMovies] = useState([])
  const [allMoviesList, setAllMoviesList] = useState([])
  const [NotFound, setNotFound] = useState(false)
  const [filteredMovies, setFilteredMovies] = useState([])

  const currentUser = useContext(currentUserContext);

  function filterShortMovies(movies) {
    return movies.filter(movie => movie.duration < 40)
  }

  function filterMovies(movies, userQuery, shortMovies) {
    const moviesByUserQuery = movies.filter((movie) => {
      const movieNameRu = String(movie.nameRU).toLowerCase().trim()
      const movieNameEn = String(movie.nameEN).toLowerCase().trim()
      const userMovie = userQuery.toLowerCase().trim()
      return movieNameRu.indexOf(userMovie) !== -1 || movieNameEn.indexOf(userMovie) !== -1
    })

    if(shortMovies) {
      return filterShortMovies(moviesByUserQuery)
    } else {
      return moviesByUserQuery
    }
  }

  function handleFilteredMovies(movies, userQuery, shortMovies) {
    const moviesList = filterMovies(movies, userQuery, shortMovies)
    if (moviesList.length === 0) {
      setNotFound(true)
    } else {
      setNotFound(false)
    }
      setInitialMovies(moviesList)
      setFilteredMovies(
        shortMovies ? filterShortMovies(moviesList) : moviesList
      )
      localStorage.setItem(`${currentUser.email} - movies`, JSON.stringify(moviesList))
  }

  function handleSearchedSubmit(inputValue) {
    localStorage.setItem(`${currentUser.email} - shortMovies`, shortMovies)
    localStorage.setItem(`${currentUser.email} - moviesSearch`, inputValue)

    if (allMoviesList.length === 0) {
      moviesApi
        .getMovies()
        .then((movies) => {
          setAllMoviesList(movies)
          handleFilteredMovies(
            movies,
            inputValue,
            shortMovies
          )
          localStorage.setItem(`${currentUser.email} - initialMovies`, JSON.stringify(movies))
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      handleFilteredMovies(allMoviesList, inputValue, shortMovies)
    }
  }

  useEffect(() => {
    const initialMovies = JSON.parse(
      localStorage.getItem(`${currentUser.email} - initialMovies`)
    )
    if(initialMovies) {
      setAllMoviesList(initialMovies)
    }
  }, [currentUser]);

  return (
    <section className='movies'>
        <SearchForm
          searchMovies={handleSearchedSubmit}
          
        />
        <MoviesCardList
          savedMoviesList={savedMoviesList}
          moviesList={filteredMovies}
        />
    </section>
  )
}
