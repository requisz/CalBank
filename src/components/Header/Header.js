import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import Dashboard from "../Dashboard/Dashboard";

function Header() {
  // State variables for storing user profile and dietary information
  const [profileData, setProfileData] = useState(null);
  const [totalCaloriesConsumed, setTotalCaloriesConsumed] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [caloriesLeftToday, setCaloriesLeftToday] = useState(0);

  // Firebase database and authentication initialization
  const db = getFirestore();
  const auth = getAuth();

  // Function to toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, "userProfiles", auth.currentUser.uid);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setProfileData(data);
            
            // Calculate and set the calories left for the day
            setCaloriesLeftToday(data.dailyCalorieLimit - totalCaloriesConsumed);
          } else {
            console.log("Document does not exist");
          }
        } catch (error) {
          console.error("Error fetching profile: ", error);
        }
      } else {
        console.log("No user is signed in");
      }
    };

    fetchProfile();

    // Event listener for profile update
    const handleProfileUpdate = () => {
      fetchProfile();
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, [auth, db]);

  // Fetch food diary data and calculate calories consumed
  useEffect(() => {
    const fetchFoodDiary = async () => {
      if (auth.currentUser) {
        const today = new Date().toISOString().split("T")[0]; 
        const diaryRef = doc(
          db,
          `userFoodDiaries/${auth.currentUser.uid}/entries/${today}`
        );

        try {
          const diarySnap = await getDoc(diaryRef);
          if (diarySnap.exists()) {
            const diaryData = diarySnap.data();
            setTotalCaloriesConsumed(diaryData.totalCalories || 0);

            // Calculate and update calories left for the day
            const caloriesLeft = (profileData?.dailyCalorieLimit || 0) - (diaryData.totalCalories || 0);
            setCaloriesLeftToday(caloriesLeft);
            updateCaloriesLeftToday(caloriesLeft); 
          }
        } catch (error) {
          console.error("Error fetching food diary:", error);
        }
      }
    };

    fetchFoodDiary();
  }, [auth, db, profileData]);

  // Update the calories left for today in the user's profile
  const updateCaloriesLeftToday = async (caloriesLeft) => {
    if (auth.currentUser) {
      const userCaloriesRef = doc(db, "userProfiles", auth.currentUser.uid);

      try {
        await updateDoc(userCaloriesRef, { caloriesLeftToday: caloriesLeft });
        console.log("Calories left today updated in Firestore");
      } catch (error) {
        console.error("Error updating calories left today:", error);
      }
    }
  };

  // Component rendering
  console.log("Profile Data:", profileData);
  return (
    <div className="header">
      {profileData && (
        <>
          <div className="calorie-info">
            <p>Daily Calorie Limit: {profileData.dailyCalorieLimit}</p>
            <p>Calories Left Today: {profileData.caloriesLeftToday}</p>
          </div>
          <button className="menu-button" onClick={toggleMenu}>Menu</button>
          {isMenuOpen && <Dashboard />}
        </>
      )}
    </div>
  );
}

export default Header;
