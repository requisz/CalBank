// src/components/UserProfile.js

import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function UserProfile() {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [daysCut, setDaysCut] = useState('');
  const [poundsToLose, setPoundsToLose] = useState('');
  const [cheatDays, setCheatDays] = useState('');
  const [notificationFrequency, setNotificationFrequency] = useState('24');

  return (
    <div>
        <h1>Profile Settings</h1>
        <Header />
      <p>Enter your age: 
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} autocomplete="off" />
      </p>
      
      <p>Enter your height (in cm): 
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} autocomplete="off" />
      </p>
      
      <p>Enter your weight (in kg): 
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} autocomplete="off" />
      </p>
      
      <p>(Activity level key: 1- Sedentary (little to no exercise + work a desk job), 2- Lightly Active (light exercise 1-3 days / week), 3- Moderately Active (moderate exercise 3-5 days / week), 4- Very Active (heavy exercise 6-7 days / week), 5- Extremely Active (very heavy exercise, hard labor job, training 2x / day))</p>
      
      <p>Enter your Activity Level (1 - 5): 
        <input type="number" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} autocomplete="off" />
      </p>
      
      <p>Enter your days of cut total (Recommended about 1 week per 1.5 lb to lose): 
        <input type="number" value={daysCut} onChange={(e) => setDaysCut(e.target.value)} autocomplete="off" />
      </p>
      
      <p>Enter your desired pounds to lose: 
        <input type="number" value={poundsToLose} onChange={(e) => setPoundsToLose(e.target.value)} autocomplete="off" />
      </p>
      
      <p>Enter your desired number of cheat days: 
        <input type="number" value={cheatDays} onChange={(e) => setCheatDays(e.target.value)} autocomplete="off" />
      </p>
      <p>Notification settings: 
        <select 
          value={notificationFrequency} 
          onChange={(e) => setNotificationFrequency(e.target.value)}
        >
          <option value="6">Every 6 hours</option>
          <option value="12">Every 12 hours</option>
          <option value="24">Every 24 hours</option>
          <option value="48">Every 48 hours</option>
          <option value="off">Off</option>
        </select>
      </p>
      <Footer />
    </div>
  );
}

export default UserProfile;
