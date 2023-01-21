import { useState } from 'react'
import './App.css';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function App() {
const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
    <Header loggedIn={loggedIn} />
    <Main />
    <Footer />
    </div>
  );
}

export default App;
