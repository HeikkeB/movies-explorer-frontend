import { useState, useContext, useEffect } from 'react'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import { adaptBackendMovies, filterMovies, filterShortMovies } from '../../utils/utils'
import './Movies.css'
import NotFoundSearch from '../NotFoundSearch/NotFoundSearch'
import { currentUserContext } from '../../context/CurrentUserContext'
import { moviesApi } from '../../utils/MoviesApi' 

export default function Movies({ likeClick, savedMoviesList, removeLikeClick }) {
  const [shortMovies, setShortMovies] = useState(false)
  const [initialMovies, setInitialMovies] = useState([])
  const [allMoviesList, setAllMoviesList] = useState([])
  const [notFound, setNotFound] = useState(false)
  const [filteredMovies, setFilteredMovies] = useState([])
  const [loading, setLoading] = useState(false)

  const currentUser = useContext(currentUserContext);

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

  function handleShortMovies() {
    setShortMovies(!shortMovies)
    if(!shortMovies) {
      if(filterShortMovies(initialMovies).length === 0) {
        setFilteredMovies(filterShortMovies(initialMovies))
      } else {
        setFilteredMovies(filterShortMovies(initialMovies))
      }
    } else {
      setFilteredMovies(initialMovies)
    }
    localStorage.setItem(`${currentUser.email} - shortMovies`, !shortMovies)
  }

  function handleSearchedSubmit(inputValue) {
    localStorage.setItem(`${currentUser.email} - shortMovies`, shortMovies)
    localStorage.setItem(`${currentUser.email} - moviesSearch`, inputValue)

    if (allMoviesList.length === 0) {
      setLoading(true)
      moviesApi
        .getMovies()
        .then((movies) => {
          setAllMoviesList(movies)
          handleFilteredMovies(
            adaptBackendMovies(movies),
            inputValue,
            shortMovies
          )
          // localStorage.setItem(`${currentUser.email} - initialMovies`, JSON.stringify(movies))
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      handleFilteredMovies(allMoviesList, inputValue, shortMovies)
    }
  }

  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - movies`)) {
      const movies = JSON.parse(
        localStorage.getItem(`${currentUser.email} - movies`)
      );
      setInitialMovies(movies);
      if (
        localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true'
      ) {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true') {
      setShortMovies(true)
    } else {
      setShortMovies(false)
    }
  }, [currentUser.email])

  // useEffect(() => {
  //   const initialMovies = JSON.parse(
  //     localStorage.getItem(`${currentUser.email} - initialMovies`)
  //   )
  //   if(initialMovies) {
  //     setAllMoviesList(initialMovies)
  //   }
  // }, [currentUser]);

  return (
    <section className='movies'>
        <SearchForm
          searchMovies={handleSearchedSubmit}
          filteredShortMovies={handleShortMovies}
          shortMovies={shortMovies}
        />
        {notFound === true ? 
         <NotFoundSearch />
         : 
        <MoviesCardList
          savedMoviesList={savedMoviesList}
          moviesList={filteredMovies}
          likeClick={likeClick}
          removeLikeClick={removeLikeClick}
          loading={loading}
        />
        }
    </section>
  )
}
