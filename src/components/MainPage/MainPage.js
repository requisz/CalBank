// src/components/MainPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function MainPage() {
  
  return (
    <div>
        <h1>Welcome to Calorie Bank</h1>
      <Header />
      
      <p>
        Calorie Bank is your innovative approach to managing nutrition and 
        maintaining a healthy lifestyle. Our web app is designed to empower 
        you with the tools needed to track your dietary habits, monitor your 
        macronutrient intake, and effectively manage your calorie consumption.
      </p>
      <h2>Features:</h2>
      <ul>
        <li><strong>Food Diary:</strong> Log your daily meals and keep an eye on your macros.</li>
        <li><strong>Calorie Banking:</strong> Save your unused calories for a day when you need them more.</li>
        <li><strong>Food Entry:</strong> Add custom food items with their nutritional content.</li>
        <li><strong>Nutritional Insights:</strong> Get detailed reports and make informed decisions about your diet.</li>
        <li><strong>Smart Notifications:</strong> Set up reminders to help you stay on track with your goals.</li>
      </ul>
      <p>
        Whether you're looking to lose weight, gain muscle, or simply lead a healthier life, 
        Calorie Bank is your personal nutrition assistant. Start your journey today and make 
        every calorie count!
      </p>
      <Footer />
    </div>
  );
}

export default MainPage;
