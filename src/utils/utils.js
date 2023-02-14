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

function adaptBackendMovies(movies) {
  movies.forEach((movie) => {
    // if(!movie.image) {
    //   movie.image = 'https://media.istockphoto.com/id/1416208685/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?b=1&s=170667a&w=0&k=20&c=Wa2XQXJhwu9JFfSMz55HQzuudj32yIZ6jC33icNCacg='
    //   movie.thumbnail = 'https://media.istockphoto.com/id/1416208685/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?b=1&s=170667a&w=0&k=20&c=Wa2XQXJhwu9JFfSMz55HQzuudj32yIZ6jC33icNCacg='
    // } else {
    //   movie.image = `https://api.nomoreparties.co${movie.image.url}`
    //   movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
    // }
    if(!movie.country) {
      movie.country = `it's unknown`
    }
    if(!movie.nameEN) {
      movie.nameEN = movie.nameRU
    }
  })
  return movies
}

export { filterShortMovies, filterMovies, adaptBackendMovies }