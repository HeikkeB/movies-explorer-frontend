import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import './App.css';
import { api } from '../../utils/MainApi';
import { currentUserContext } from '../../context/CurrentUserContext';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login'
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

function App() {
const [loggedIn, setLoggedIn] = useState(false);
const [currentUser, setCurrentUser] = useState({})

const history = useNavigate()

useEffect(() => {
  if(loggedIn) {
    api
    .getUserInfo()
    .then((data) => {
      setLoggedIn(true)
      setCurrentUser(data)
      history('/')
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
        history('/')
      }
     })
     .catch((err) => {
      console.log(err)
     })
}, [loggedIn])

function handleRegister({ name, email, password }) {
  api
    .createUser(name, email, password)
    .then((res) => {
      if(res.codeStatus !== 400) {
        history('/signin')
      }
    })
    .catch((err) => {
      return console.log(err)
    })
    .finally(() => {
      console.log(`Don't worry, be happy`)
    })
}

function handleLogin({ email, password }) {
  api
    .login(email, password)
    .then(() => {
      setLoggedIn(true)
      history('/')
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      console.log(`Don't worry, be happy`)
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
              <Movies />
              <Footer />
            </ProtectedRoute>
          }
          />
          <Route path='/saved-movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} />
              <SavedMovies />
              <Footer />
            </ProtectedRoute>
          }
          />
          <Route path='/profile' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} />
              <Profile signOut={signOut} />
            </ProtectedRoute>
          }
          />
          <Route path='*' element={ loggedIn ? <Navigate to='/' /> : <NotFound /> } />
    </Routes>
    </div>
    </currentUserContext.Provider>
  )
}

export default App;
