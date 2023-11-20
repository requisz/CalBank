

import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RequireAuth from '../RequireAuth';

function CalorieBank() {
  // Assuming we start with a sample value of banked calories
  const [bankedCalories, setBankedCalories] = useState(1500);
  const [caloriesToUse, setCaloriesToUse] = useState('');

  const useCalories = () => {
    if (caloriesToUse && !isNaN(caloriesToUse) && caloriesToUse > 0) {
      // Make sure we don't use more calories than we have
      const caloriesToDeduct = Math.min(caloriesToUse, bankedCalories);
      setBankedCalories(bankedCalories - caloriesToDeduct);
      setCaloriesToUse(''); // Reset input
    }
  };

  return (
    <div>
      <h1>Calorie Bank</h1>
      <Header />
      <p>Banked Calories: {bankedCalories}</p>
      <div>
        <input 
          type="number" 
          value={caloriesToUse} 
          onChange={(e) => setCaloriesToUse(e.target.value)} 
          placeholder="Enter calories to use"
        />
        <button onClick={useCalories}>Use Calories</button>
      </div>
      <Footer />
    </div>
  );
}

export default RequireAuth(CalorieBank);

