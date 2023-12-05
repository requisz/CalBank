import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import '../../App.css';
import RequireAuth from '../RequireAuth';
import { doc, getDoc, updateDoc, getFirestore } from 'firebase/firestore';

function CaloriesBankedPage() {
    // State for managing calories data
    const [caloriesToStore, setCaloriesToStore] = useState(0);
    const [caloriesToUse, setCaloriesToUse] = useState(0);
    const [caloriesBanked, setCaloriesBanked] = useState(0);
    const [caloriesLeftToday, setCaloriesLeftToday] = useState(0);

    // Firebase initialization
    const db = getFirestore();
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    // Fetch initial user data from Firestore
    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                const userRef = doc(db, "userProfiles", userId);
                try {
                    const docSnap = await getDoc(userRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setCaloriesBanked(data.caloriesBanked || 0);
                        setCaloriesLeftToday(data.caloriesLeftToday || 0);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchData();
    }, [userId, db]);

    // Function to handle storing calories
    const handleStoreCalories = async () => {
        // Calculation for new calories banked and left today
        const newCaloriesBanked = caloriesBanked + caloriesToStore;
        const newCaloriesLeftToday = caloriesLeftToday - caloriesToStore;

        // Update Firestore with new values
        if (newCaloriesLeftToday >= 0 && userId) {
            const userRef = doc(db, "userProfiles", userId);
            try {
                await updateDoc(userRef, {
                    caloriesBanked: newCaloriesBanked,
                    caloriesLeftToday: newCaloriesLeftToday
                });
                setCaloriesBanked(newCaloriesBanked);
                setCaloriesLeftToday(newCaloriesLeftToday);
            } catch (error) {
                console.error("Error updating user data:", error);
            }
        } else {
            alert("Not enough calories left to store!");
        }
    };

    // Function to handle using banked calories
    const handleUseCalories = async () => {
        // Ensure there are enough banked calories to use
        if (caloriesToUse > caloriesBanked) {
            alert("Not enough banked calories to use!");
            return;
        }

        // Update calories banked and left today
        const newCaloriesBanked = caloriesBanked - caloriesToUse;
        const newCaloriesLeftToday = caloriesLeftToday + caloriesToUse;

        // Update Firestore with new values
        if (userId) {
            const userRef = doc(db, "userProfiles", userId);
            try {
                await updateDoc(userRef, {
                    caloriesBanked: newCaloriesBanked,
                    caloriesLeftToday: newCaloriesLeftToday
                });
                setCaloriesBanked(newCaloriesBanked);
                setCaloriesLeftToday(newCaloriesLeftToday);
            } catch (error) {
                console.error("Error updating user data:", error);
            }
        }
    };

    return (
        <div className="calories-banked-page">
            <h1>Bank Your Calories</h1>
            <Header/>
            {/* Display current calories status */}
            <p>Calories Left Today: {caloriesLeftToday}</p>
            <p>Calories Banked: {caloriesBanked}</p>
            
            {/* Input and button to store calories */}
            <div>
                <input
                    type="number"
                    value={caloriesToStore}
                    onChange={(e) => setCaloriesToStore(parseInt(e.target.value))}
                />
                <button onClick={handleStoreCalories}>Store Calories</button>
            </div>

            {/* Input and button to use banked calories */}
            <div>
                <input
                    type="number"
                    value={caloriesToUse}
                    onChange={(e) => setCaloriesToUse(parseInt(e.target.value))}
                />
                <button onClick={handleUseCalories}>Use Calories</button>
            </div>
            <Footer/>
        </div>
    );
}

export default RequireAuth(CaloriesBankedPage);
