import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AllUsers from './components/Users/all_users';
import { Auth } from './components/Auth/Auth';
import { Home } from './components/Home/Home';
import SearchFood from './services/testingcalroeiapi';
import { FoodDiary } from './components/FoodDiary/FoodDiary';
import { MyGoals } from './components/MyGoals/MyGoals';
import { EditGoals } from './components/MyGoals/EditGoals';
import { AuthContextProvider } from './AuthContext';
import { Navbar } from './components/Navbar/Navbar';

// import Nav from './Nav';


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Navbar />
          <div className="container">
            <Routes>
              <Route path="/auth" element={<Auth/>} />
              <Route path='/' element={<Navigate replace to='/home'/>}/>
              <Route path="/home" element={<Home/>} />
              <Route path="/fooddiary" element={<FoodDiary/>} />
              <Route path="/mygoals" element={<MyGoals/>} />
              <Route path="/editgoals" element={<EditGoals/>} />
              <Route path="/users" element={<AllUsers />} />
              <Route path="/foodapi" element={<SearchFood />} />
            </Routes>
          </div>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;