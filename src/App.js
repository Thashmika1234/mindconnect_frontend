import logo from './logo.svg';
import './App.css';
import { LoginSignup } from './components/loginSignupComponents/LoginSignup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Registration from './pages/Registration'
import Account from './pages/Account';
import RegularUserAcc from './pages/RegularUserAcc';
import Posting from './pages/Posting';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Registration' element={<Registration/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path='/account' element={<Account/>}/>
        <Route path='/regularUserAcc' element={<RegularUserAcc/>}/>
        <Route path='/posting' element={<Posting/>}/>
        <Route path="/home" element={<HomePage />} />
      
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
