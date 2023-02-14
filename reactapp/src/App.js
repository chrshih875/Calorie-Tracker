import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllUsers from './all_users';
import { Foods } from './components/CalorieApi/calorie_api';
import GetAllFoods from './services/calorieApiService';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/user1" element={<AllUsers />} />
          <Route path="/foods" element={<Foods />} />
          <Route path="/createfoods" element={<GetAllFoods />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
