import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllUsers from './components/Users/all_users';
import { Launches } from './components/SpaceX/Launches';
import { OneLaunch } from './components/SpaceX/OneLaunch';
import { Foods } from './components/CalorieApi/calorie_api';
import { Auth } from './components/Auth/Auth';
import { Home } from './components/Home/Home';
import SearchFood from './services/testingcalroeiapi';
import { FoodDiary } from './components/FoodDiary/FoodDiary';
import { MyGoals } from './components/MyGoals/MyGoals';
import { EditGoals } from './components/MyGoals/EditGoals';
import { AuthContextProvider } from './AuthContext';
import Nav from './Nav';


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Nav />
          <div className="container">
            <Routes>
              <Route path="/auth" element={<Auth/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/fooddiary" element={<FoodDiary/>} />
              <Route path="/mygoals" element={<MyGoals/>} />
              <Route path="/editgoals" element={<EditGoals/>} />
              <Route path="/users" element={<AllUsers />} />
              <Route path="/space" element={<Launches />} />
              <Route path="/foods" element={<Foods />} />
              <Route path="/foodapi" element={<SearchFood />} />
              <Route path="/launches/:id" element={<OneLaunch />} />
            </Routes>
          </div>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
