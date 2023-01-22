import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Register from '../Register/Register';

function App() {
const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
    <Routes>
        <Route
          path='/signup'
          element={ <Register /> }
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
    </Routes>
    </div>
  );
}

export default App;
