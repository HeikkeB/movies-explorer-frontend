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
const [loading, setLoading] = useState(false)

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

function toastInformation(message) {
  if(message === 'Error: 409') {
   toast.error('Пользователь с таким E-mail уже есть')
  } else if (message === 'Error: 400' || message === 'Error: 500'){
    toast.error('Что-то пошло не так')
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
        toastInformation(res.codeStatus)
      }
    })
    .catch((err) => {
      console.log(err)
      toastInformation(err)
    })
}

function handleLogin({ email, password }) {
  setLoading(true)
  api
    .login(email, password)
    .then(() => {
      setLoggedIn(true)
      history('/movies')
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      setLoading(false)
    })
}

function signOut() {
  api
    .logOut()
    .then(() => {
      setLoggedIn(false)
      history('/')
    })
    .catch((err) => {
      console.log(err)
    })
}

function handleUpdateUser({ name, email }) {
  api
    .updateUser(name, email)
    .then(newUserData => {
      setCurrentUser(newUserData);
    })
    .catch((err) => {
      console.log(err)
    })
}

// add to save movies and put like
function handleSaveMovie(movie) {
  api
    .createMovies(movie)
    .then(newMovie => setSavedMoviesList([newMovie, ...savedMoviesList]))
    .catch((err) => {
      console.log(err)
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
    })
    .catch((err) => {
      console.log(err)
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
           loading={loading}
            />
          }
        />
        <Route
          path='/signin'
          element={ <Login
            handleLogin={handleLogin}
            loading={loading}
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
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="#272727"
    />

    </div>
    </currentUserContext.Provider>
  )
}

export default App;
