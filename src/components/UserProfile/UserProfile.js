// src/components/UserProfile.js

import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RequireAuth from '../RequireAuth';

function UserProfile() {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [daysCut, setDaysCut] = useState('');
  const [poundsToLose, setPoundsToLose] = useState('');
  const [cheatDays, setCheatDays] = useState('');
  const [notificationFrequency, setNotificationFrequency] = useState('24');

  const db = getFirestore();
  const auth = getAuth();

  const saveProfile = async () => {
    if (auth.currentUser) {
      const userProfile = {
        age,
        height,
        weight,
        activityLevel,
        daysCut,
        poundsToLose,
        cheatDays,
        notificationFrequency,
      };

      

      try {
        // Save the user profile data to Firestore, under the 'userProfiles' collection, 
        // with a document ID that matches the current user's UID
        await setDoc(doc(db, 'userProfiles', auth.currentUser.uid), userProfile);
        alert('Profile saved successfully!');
      } catch (error) {
        console.error('Error writing document: ', error);
        alert('Error saving profile.');
      }
    } else {
      alert('No user is signed in to save profile.');
    }
  };
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
      <button onClick={saveProfile}>Save Profile</button>
      <Footer />
    </div>
  );
}


export default RequireAuth(UserProfile);



