
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Loginlogout from './Loginlogout';

function App() {
  return (
    <>
      <Router>
       
        <Routes>
          <Route path="/"  element={<Loginlogout />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
