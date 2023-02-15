import { toast } from 'react-toastify'

function filterShortMovies(movies) {
    return movies.filter(movie => movie.duration < 40)
  }

function filterMovies(movies, userQuery) {
    const moviesByUserQuery = movies.filter((movie) => {
      const movieNameRu = String(movie.nameRU).toLowerCase().trim()
      const movieNameEn = String(movie.nameEN).toLowerCase().trim()
      const userMovie = userQuery.toLowerCase().trim()
      return movieNameRu.indexOf(userMovie) !== -1 || movieNameEn.indexOf(userMovie) !== -1
    })
    return moviesByUserQuery
}

function adaptBackendMovies(movies) {
  movies.forEach((movie) => {
    if(!movie.country) {
      movie.country = `it's unknown`
    }
    if(!movie.nameEN) {
      movie.nameEN = movie.nameRU
    }
  })
  return movies
}

function changeDuration(duration) {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;
  if(hours === 0) {
    return `${minutes}м`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
}

function toastInfoError(message) {
  if(message === 'Error: 409') {
   toast.error('Пользователь с таким E-mail уже есть')
  } else if (message === 'Error: 400' || message === 'Error: 500'){
    toast.error('Что-то пошло не так')
  } else if (message === 'Error: 401') {
    toast.error('Неправильный логин или пароль')
  } else if (message === 'Error: 429') {
    toast.warn('Слишком много запросов к серверу')
  }
}

export { filterShortMovies, filterMovies, adaptBackendMovies, changeDuration, toastInfoError }