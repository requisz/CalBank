

import React from 'react';
import '../../App.css'; 
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
      <div> <br></br></div>
      <div className="dashboard-buttons">
        <button className="button" onClick={handleMain}>Home</button>
        <button className="button" onClick={handleUserProfile}>Profile Settings</button>
        <button className="button" onClick={handleFoodDiary}>Food Diary</button>
        <button className="button" onClick={handleCalorieBank}>Calorie Bank</button>
      </div>
    </div>
  );
}

export default Dashboard;
