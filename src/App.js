import logo from './logo.svg';
import './App.css';
import { LoginSignup } from './components/loginSignupComponents/LoginSignup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DoctorHomePage from './pages/DoctorHomePage';
import Registration from './pages/Registration'
import DoctorAccount from './pages/DoctorAccount';
import RegularUserHomePage from './pages/RegularUserHomePage';
import RegularUserAccount from './pages/RegularUserAccount';
import Posting from './pages/Posting';
import CounsellorHomePage from './pages/ CounsellorHomePage';
import CounsellorAccount from './pages/CounsellorAccount';
import Homepage from './pages/Homepage';
import SettingPage from './pages/SettingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/Registration' element={<Registration/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path='/' element={<DoctorHomePage/>}/>
        <Route path='/doctoraccount' element={<DoctorAccount/>}/>
        <Route path='/regularUserHomePage' element={<RegularUserHomePage/>}/>
        <Route path='/regularUserAccount' element={<RegularUserAccount/>}/>
        <Route path='/counsellorHomePage' element={<CounsellorHomePage/>}/>
        <Route path='/counsellorAccount' element={<CounsellorAccount/>}/>
        <Route path='/posting' element={<Posting/>}/>
        <Route path='/homepage' element={<Homepage/>}/>
        <Route path='/SettingPage' element={<SettingPage/>}/>


       
        
        
        
        
        
      
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
