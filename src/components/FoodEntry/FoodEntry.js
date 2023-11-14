// src/components/FoodEntry.js

import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function FoodEntry() {
  // State for adding a new food entry
  const [foodName, setFoodName] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  const [calories, setCalories] = useState('');

  // State for searching food entries
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddFood = (event) => {
    event.preventDefault();
    // Here you would typically handle the submission to add the food to your database or state
    console.log({ foodName, protein, carbs, fats, calories });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // Here you would handle the search logic
    console.log(searchTerm);
  };

  return (
    <div>
      <h1>Food Entry</h1>
      <Header />
      <div>
        <h2>Add Your Own Food</h2>
        <form onSubmit={handleAddFood}>
          <input type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)} placeholder="Food Name" required />
          <input type="number" value={protein} onChange={(e) => setProtein(e.target.value)} placeholder="Protein (g)" required />
          <input type="number" value={carbs} onChange={(e) => setCarbs(e.target.value)} placeholder="Carbs (g)" required />
          <input type="number" value={fats} onChange={(e) => setFats(e.target.value)} placeholder="Fats (g)" required />
          <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="Calories" required />
          <button type="submit">Add Food</button>
        </form>
      </div>

      <div>
        <h2>Or Search For Food</h2>
        <form onSubmit={handleSearch}>
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." required />
          <button type="submit">Search</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default FoodEntry;
