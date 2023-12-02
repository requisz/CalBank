import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import MainPage from "./components/MainPage/MainPage";
import CalorieBank from "./components/CalorieBank/CalorieBank";
import FoodDiary from "./components/FoodDiary/FoodDiary";
import FoodEntry from "./components/FoodEntry/FoodEntry";
import UserProfile from "./components/UserProfile/UserProfile";
import SignUp from "./components/SignUp/SignUp";
import Friends from "./components/Friends/Friends";
import Footer from "./components/Footer/Footer";

function App() {
  const [dailyCalorieLimit, setDailyCalorieLimit] = useState(null);
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUserProfile = async () => {
          const docRef = doc(db, "userProfiles", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setDailyCalorieLimit(docSnap.data().dailyCalorieLimit);
          }
        };
        fetchUserProfile();
      }
    });
    return unsubscribe;
  }, []);
  return (


      <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/CalorieBank" element={<CalorieBank />} />
        <Route path="/FoodDiary" element={<FoodDiary />} />
        <Route path="/FoodEntry" element={<FoodEntry />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Friends" element={<Friends />} />
      </Routes>
    </Router>
    
  );
}

export default App;
