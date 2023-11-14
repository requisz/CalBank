

import React from 'react';
import './Dashboard.css'; // Assuming you have a Dashboard.css for styling
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




return (
    
    <div className="dashboard">
      <div className="dashboard-buttons">
        <button onClick={handleMain}>Home</button>
        <button onClick={handleUserProfile}>Profile Settings</button>
        <button onClick={handleFoodDiary}>Food Diary</button>
        <button onClick={handleCalorieBank}>Calorie Bank</button>
        
        {/* More buttons if needed */}
      </div>
    </div>
  );
}

export default Dashboard;
