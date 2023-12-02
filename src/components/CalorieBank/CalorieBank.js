import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import '../../App.css';
import { doc, getDoc, updateDoc, getFirestore } from 'firebase/firestore';

function CaloriesBankedPage() {
    const [caloriesToStore, setCaloriesToStore] = useState(0);
    const [caloriesToUse, setCaloriesToUse] = useState(0);
    const [caloriesBanked, setCaloriesBanked] = useState(0);
    const [caloriesLeftToday, setCaloriesLeftToday] = useState(0);

    const db = getFirestore();
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    useEffect(() => {
        // Fetch initial data
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

    const handleStoreCalories = async () => {
        const newCaloriesBanked = caloriesBanked + caloriesToStore;
        const newCaloriesLeftToday = caloriesLeftToday - caloriesToStore;

        if (newCaloriesLeftToday >= 0 && userId) {
            // Update Firestore
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

    const handleUseCalories = async () => {
        if (caloriesToUse > caloriesBanked) {
            alert("Not enough banked calories to use!");
            return;
        }

        const newCaloriesBanked = caloriesBanked - caloriesToUse;
        const newCaloriesLeftToday = caloriesLeftToday + caloriesToUse;

        if (userId) {
            // Update Firestore
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
            <p>Calories Left Today: {caloriesLeftToday}</p>
            <p>Calories Banked: {caloriesBanked}</p>
            
            <div>
                <input
                    type="number"
                    value={caloriesToStore}
                    onChange={(e) => setCaloriesToStore(parseInt(e.target.value))}
                />
                <button onClick={handleStoreCalories}>Store Calories</button>
            </div>

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

export default CaloriesBankedPage;
