import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllUsers from './all_users';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/user1" element={<AllUsers />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
