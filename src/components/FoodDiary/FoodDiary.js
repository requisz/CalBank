// src/components/FoodDiary.js

import React from 'react';
import FoodEntry from '../FoodEntry/FoodEntry';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function FoodDiary() {
    const navigate = useNavigate();
  // Sample array of food items
  const foodItems = [
    { name: 'Chicken Breast', protein: 31, carbs: 0, fats: 3.6, calories: 165 },
    { name: 'Brown Rice', protein: 2.6, carbs: 23, fats: 0.9, calories: 111 },
    { name: 'Avocado', protein: 2, carbs: 9, fats: 15, calories: 160 },
    // Add more sample foods as needed
  ];

  const handleFoodEntry = () => {
    // Redirect to the Bank
    navigate('/FoodEntry');
};

  // Calculate totals using reduce
  const totals = foodItems.reduce((acc, food) => {
    return {
      totalProtein: acc.totalProtein + food.protein,
      totalCarbs: acc.totalCarbs + food.carbs,
      totalFats: acc.totalFats + food.fats,
      totalCalories: acc.totalCalories + food.calories,
    };
  }, {
    totalProtein: 0,
    totalCarbs: 0,
    totalFats: 0,
    totalCalories: 0,
  });
  

  return (
    <div>
      <h1>Food Diary</h1>
      <Header />
      <button onClick={handleFoodEntry}>Enter New Food</button>
      <table>
        <thead>
          <tr>
            <th>Food</th>
            <th>Protein (g)</th>
            <th>Carbs (g)</th>
            <th>Fats (g)</th>
            <th>Calories</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((food, index) => (
            <tr key={index}>
              <td>{food.name}</td>
              <td>{food.protein}</td>
              <td>{food.carbs}</td>
              <td>{food.fats}</td>
              <td>{food.calories}</td>
            </tr>
          ))}
          <tr>
            <td><strong>Totals:</strong></td>
            <td><strong>{totals.totalProtein}</strong></td>
            <td><strong>{totals.totalCarbs}</strong></td>
            <td><strong>{totals.totalFats}</strong></td>
            <td><strong>{totals.totalCalories}</strong></td>
          </tr>
        </tbody>
      </table>
      <Footer />
    </div>
  );
}

export default FoodDiary;
