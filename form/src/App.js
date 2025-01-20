import './App.css';
import Login from './Components/login_form/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/registration_form/registration';
import Home from './Components/home/home';

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Login />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/registration' element={<Register />}></Route>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
