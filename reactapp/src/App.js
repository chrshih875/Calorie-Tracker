import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllUsers from './components/Users/all_users';
import { Launches } from './components/SpaceX/Launches';
import { OneLaunch } from './components/SpaceX/OneLaunch';
import { Foods } from './components/CalorieApi/calorie_api';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/users" element={<AllUsers />} />
          <Route path="/space" element={<Launches />} />
          <Route path="/foods" element={<Foods />} />
          <Route path="/launches/:id" element={<OneLaunch />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
