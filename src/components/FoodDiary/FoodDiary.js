import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase"; 
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import RequireAuth from "../RequireAuth";

function FoodDiary() {
  const [currentUser, setCurrentUser] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();

  // Subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  // Fetch food diary entries for the current user
  useEffect(() => {
    const fetchFoodDiary = async () => {
      if (currentUser) {
        const today = new Date().toISOString().split("T")[0];
        const q = query(
          collection(
            db,
            `userFoodDiaries/${currentUser.uid}/entries/${today}/diaryEntries`
          )
        );

        try {
          const querySnapshot = await getDocs(q);
          const foods = querySnapshot.docs.map((doc) => doc.data());
          setFoodItems(foods);

          // Calculate and save total daily calories
          const totalCalories = foods.reduce(
            (total, food) => total + food.calories,
            0
          );
          await setDoc(
            doc(db, `userFoodDiaries/${currentUser.uid}/entries/${today}`),
            { totalCalories },
            { merge: true }
          );
        } catch (error) {
          console.error("Error fetching food diary:", error);
        }
      }
    };

    fetchFoodDiary();
  }, [currentUser]);

  // Navigate to food entry page
  const handleFoodEntry = () => {
    navigate("/FoodEntry");
  };

  // Calculate totals of macronutrients and calories
  const totals = foodItems.reduce(
    (acc, food) => {
      return {
        totalProtein: acc.totalProtein + food.protein,
        totalCarbs: acc.totalCarbs + food.carbs,
        totalFats: acc.totalFats + food.fats,
        totalCalories: acc.totalCalories + food.calories,
      };
    },
    {
      totalProtein: 0,
      totalCarbs: 0,
      totalFats: 0,
      totalCalories: 0,
    }
  );

  return (
    <div className="page-container">
      <div className="food-diary">
        <h1>Food Diary</h1>
        <Header />
        <button className="menu-button" onClick={handleFoodEntry}>Enter New Food</button>
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
                <td>{food.foodName}</td>
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
    </div>
  );
}

export default RequireAuth(FoodDiary);
