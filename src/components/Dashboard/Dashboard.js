

import React from 'react';
import '../../App.css'; 
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function Dashboard() {

    const navigate = useNavigate();

    const handleUserProfile = () => {
    
    navigate('/UserProfile');
    };

    const handleFoodDiary = () => {
        
        navigate('/FoodDiary');
    };
    const handleCalorieBank = () => {
        
        navigate('/CalorieBank');
    };
    const handleMain = () => {
        
        navigate('/main');
    };
    const handleFriends= () => {
      
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
