// src/components/FoodEntry.js
import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RequireAuth from '../RequireAuth';

function FoodEntry() {
  // State for adding a new food entry
  const [foodName, setFoodName] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  const [calories, setCalories] = useState('');

  // State for searching food entries
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleAddFood = (event) => {
    event.preventDefault();
    // Here you would typically handle the submission to add the food to your database or state
    console.log({ foodName, protein, carbs, fats, calories });
  };

  const searchFoods = async (query) => {
    try {
      const response = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/search', {
        params: {
          api_key: 'AnK9gFBNAvSmM8HyaCn5JT6atGFLXdAJjwp8zaQh',
          query: query
        }
      });
      console.log(response.data.foods[0].foodNutrients); // Log the foodNutrients of the first item
      setSearchResults(response.data.foods); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  const handleSearch = async (event) => {
    event.preventDefault();
    await searchFoods(searchTerm);
  };


// Function to find a nutrient in the foodNutrients array
const findNutrient = (nutrients, nutrientName) => {
  const nutrient = nutrients.find(n => n.nutrientName === nutrientName);
  return nutrient ? nutrient.value : 'N/A';
};


// Function to render search results
const renderSearchResults = () => {
  return searchResults.map((food, index) => (
    <div key={index}>
      <h3>{food.description}</h3>
      <p>Protein: {findNutrient(food.foodNutrients, 'Protein')} g</p>
      <p>Fats: {findNutrient(food.foodNutrients, 'Total lipid (fat)')} g</p>
      <p>Carbs: {findNutrient(food.foodNutrients, 'Carbohydrate, by difference')} g</p>
      <p>Calories: {findNutrient(food.foodNutrients, 'Energy')} kcal</p>
      {/* Add more fields as needed */}
    </div>
  ));
};



  return (
    <div>
      <h1>Food Entry</h1>
      <Header />
      <div>
        <h2>Add Your Food</h2>
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
        <h2>Food Macronutrients Search</h2>
        <form onSubmit={handleSearch}>
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." required />
          <button type="submit">Search</button>
        </form>
        <div>{renderSearchResults()}</div>
      </div>
      <Footer />
    </div>
  );
}

export default RequireAuth(FoodEntry);
