

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import MainPage from './components/MainPage/MainPage';
import CalorieBank from './components/CalorieBank/CalorieBank';
import FoodDiary from './components/FoodDiary/FoodDiary';
import FoodEntry from './components/FoodEntry/FoodEntry';
import UserProfile from './components/UserProfile/UserProfile';
import SignUp from './components/SignUp/SignUp';
import Friends from './components/Friends/Friends';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/CalorieBank" element={<CalorieBank />} />
        <Route path="/FoodDiary" element={<FoodDiary />} />
        <Route path="/FoodEntry" element={<FoodEntry />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Friends" element={<Friends />} />
      </Routes>
    </Router>
  );
}

export default App;
