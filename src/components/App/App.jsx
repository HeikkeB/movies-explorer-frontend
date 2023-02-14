import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import './App.css'
import { api } from '../../utils/MainApi'
import { currentUserContext } from '../../context/CurrentUserContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Register from '../Register/Register'
import Login from '../Login/Login'
import NotFound from '../NotFound/NotFound'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'

function App() {
const [loggedIn, setLoggedIn] = useState(false);
const [currentUser, setCurrentUser] = useState({})
const [savedMoviesList, setSavedMoviesList] = useState([])

const history = useNavigate()

useEffect(() => {
  if(loggedIn) {
    api
    .getUserInfo()
    .then((data) => {
      setLoggedIn(true)
      setCurrentUser(data)
    })
    .catch((err) => {
      console.log(err)
    })
  }
}, [loggedIn])

useEffect(() => {
    api
     .checkToken()
     .then((data) => {
      if(data) {
        setLoggedIn(true)
        setCurrentUser(data)
      }
     })
     .catch((err) => {
      console.log(err)
     })
}, [loggedIn])

useEffect(() => {
  if(loggedIn && currentUser) {
    api
      .getSaveMovies()
      .then(data => {
        const moviesList = data.filter(m => m.owner === currentUser._id)
        setSavedMoviesList(moviesList)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}, [currentUser, loggedIn])

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

function handleRegister({ name, email, password }) {
  api
    .createUser(name, email, password)
    .then((res) => {
      if(res.codeStatus !== 400) {
        handleLogin({email, password})
      }
      if(res.codeStatus === 400 || res.codeStatus === 500) {
        toastInfoError(res.codeStatus)
      }
    })
    .catch((err) => {
      console.log(err)
      toastInfoError(err)
    })
}

function handleLogin({ email, password }) {
  api
    .login(email, password)
    .then(() => {
      setLoggedIn(true)
      history('/movies')
      toast.success('Добро пожаловать!')
      firstEnter()
    })
    .catch((err) => {
      console.log(err)
      toastInfoError(err)
    })
}

function signOut() {
  api
    .logOut()
    .then(() => {
      setLoggedIn(false)
      history('/')
      localStorage.removeItem(`${currentUser.email} - movies`)
      localStorage.removeItem(`${currentUser.email} - shortMovies`)
      localStorage.removeItem(`${currentUser.email} - moviesSearch`)
      localStorage.removeItem(`${currentUser.email} - shortSavedMovies`)
      toast.success('До скорой встречи!')
    })
    .catch((err) => {
      console.log(err)
      toastInfoError(err)
    })
}

function firstEnter() {
  if(!localStorage.getItem(`${currentUser.email} - moviesSearch`)) {
    console.log('enter to search')
  }
}

function handleUpdateUser({ name, email }) {
  api
    .updateUser(name, email)
    .then(newUserData => {
      setCurrentUser(newUserData);
      toast.success('Ваши данные обновлены!')
    })
    .catch((err) => {
      console.log(err)
      toastInfoError(err)
    })
}

function handleSaveMovie(movie) {
  api
    .createMovies(movie)
    .then(newMovie => setSavedMoviesList([newMovie, ...savedMoviesList]))
    .catch((err) => {
      console.log(err)
      toastInfoError(err)
    })
}

function handleRemoveMovie(movie) {
  const savedMovie = savedMoviesList.find((item) => item.movieId === movie.id || item.movieId === movie.movieId)
  api
    .removeMovie(savedMovie._id)
    .then(() => {
      const newMovieList = savedMoviesList.filter(m => {
        if(movie.id === m.movieId || movie.movieId === m.movieId) {
          return false
        } else {
          return true
        }
      })
      setSavedMoviesList(newMovieList)
      toast.success('Фильм удален из ваших сохранений')
    })
    .catch((err) => {
      console.log(err)
      toastInfoError(err)
    })
}

  return (
    <currentUserContext.Provider value={currentUser}>
    <div className="App">
    <Routes>
        <Route
          path='/signup'
          element={ <Register
           handleRegister={handleRegister}
            />
          }
        />
        <Route
          path='/signin'
          element={ <Login
            handleLogin={handleLogin}
            />
          }
        />
        <Route
          exact='true'
          path='/'
          element={
            <>
             <Header loggedIn={loggedIn} />
              <Main /> 
              <Footer />
            </>
             }
          />
          <Route path='/movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
            <Header loggedIn={loggedIn} />
              <Movies
                likeClick={handleSaveMovie}
                removeLikeClick={handleRemoveMovie}
                savedMoviesList={savedMoviesList}
                />
              <Footer />
            </ProtectedRoute>
          }
          />
          <Route path='/saved-movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} />
              <SavedMovies
              savedMoviesList={savedMoviesList}
              removeLikeClick={handleRemoveMovie}
              />
              <Footer />
            </ProtectedRoute>
          }
          />
          <Route path='/profile' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} />
              <Profile
              signOut={signOut}
              handleUpdateUser={handleUpdateUser}
              />
            </ProtectedRoute>
          }
          />
          <Route path='*' element={ loggedIn ? <Navigate to='/' /> : <NotFound /> } />
    </Routes>

    <ToastContainer
      position="bottom-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="dark"
    />

    </div>
    </currentUserContext.Provider>
  )
}

export default App;
