

import React from 'react';
import './Dashboard.css'; 
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function Dashboard() {

    const navigate = useNavigate();

    const handleUserProfile = () => {
    // Redirect to the Profile
    navigate('/UserProfile');
    };

    const handleFoodDiary = () => {
        // Redirect to the Profile
        navigate('/FoodDiary');
    };
    const handleCalorieBank = () => {
        // Redirect to the Bank
        navigate('/CalorieBank');
    };
    const handleMain = () => {
        // Redirect to the Bank
        navigate('/main');
    };
    const handleFriends= () => {
      // Redirect to the Bank
      navigate('/Friends');
  };




return (
    
    <div className="dashboard">
      <div className="dashboard-buttons">
        <button onClick={handleMain}>Home</button>
        <button onClick={handleUserProfile}>Profile Settings</button>
        <button onClick={handleFoodDiary}>Food Diary</button>
        <button onClick={handleCalorieBank}>Calorie Bank</button>
        <button onClick={handleFriends}>Friends</button>
      </div>
    </div>
  );
}

export default Dashboard;
