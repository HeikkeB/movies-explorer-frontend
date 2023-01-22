import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login'
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import SearchForm from '../SearchForm/SearchForm';

function App() {
const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="App">
    <Routes>
        <Route
          path='/signup'
          element={ <Register /> }
        />
        <Route
          path='/signin'
          element={ <Login /> }
        />
        <Route
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
              <SearchForm />
              <Movies />
              <Footer />
            </ProtectedRoute>
          }
          />
          <Route path='*' element={ <NotFound /> } />
    </Routes>
    </div>
  );
}

export default App;
