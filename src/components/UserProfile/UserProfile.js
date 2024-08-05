import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, setDoc, getFirestore, getDoc, addDoc } from "firebase/firestore";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import RequireAuth from "../RequireAuth";
import '../../App.css';
import { useNavigate } from "react-router-dom";
import { collection } from "firebase/firestore";

function UserProfile() {
  
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [notificationFrequency, setNotificationFrequency] = useState("24");

  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailHtmlContent, setEmailHtmlContent] = useState('');
  const [emailTextContent, setEmailTextContent] = useState('');


  const [goal, setGoal] = useState(""); 
  const [daysCutOrBulk, setDaysCutOrBulk] = useState("");
  const [poundsChange, setPoundsChange] = useState("");
  const [cheatDays, setCheatDays] = useState("");
  const [dailyCalorieLimit, setDailyCalorieLimit] = useState(0);
  const navigate = useNavigate();
  const db = getFirestore();
  const auth = getAuth();

  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };
  const handleClick= () => {
    
    navigate('/Friends');
  };
//similar to thread handling but in the JavaScript single thread environment
  const sendEmail = async () => {
    const emailData = {
      to: ["rakesh.pamulapati@gmail.com"], // 'to' as an array
      message: {
        subject: "SAMPLE EMAIL: You still have calories left in the day!",
        html: "Please log into the caloric web app and complete your food diary to stay on track with your progress.",
        text: "Please log into the caloric web app and complete your food diary to stay on track with your progress."
      }
    };
  
    try {
      await addDoc(collection(db, "mail"), emailData);
      alert("Email queued for sending!");
    } catch (error) {
      console.error("Error sending email: ", error);
      alert("Error sending email.");
    }
  };
  
  
  
  
  
// lambda expressions, concise way of handling multiple actions with a single ananymous function.
  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, "userProfiles", auth.currentUser.uid);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setAge(data.age || "");
            setHeight(data.height || "");
            setWeight(data.weight || "");
            setActivityLevel(data.activityLevel || "");
            setNotificationFrequency(data.notificationFrequency || "24");
            setGoal(data.goal || "");

            
            if (data.goal === "bulk" || data.goal === "cut") {
              setDaysCutOrBulk(data.daysCutOrBulk || "");
              setPoundsChange(data.poundsChange || "");
            }

            if (data.goal !== "maintain") {
              setCheatDays(data.cheatDays || "");
            }
          }
        } catch (error) {
          console.error("Error fetching profile: ", error);
        }
      }
    };
// System design pattern of the Singleton Pattern where a single instance of an object is used throughout an application in each class after user initialization.
    fetchProfile();
  }, [auth, db]);
  const calculateDailyCalorieLimit = (
    age,
    height,
    weight,
    activityLevel,
    goal,
    daysCutOrBulk,
    poundsChange
  ) => {
    
    if (!age || !height || !weight || !activityLevel || !goal) {
      return 0; 
    }

    const bmr = calculateBMR(Number(weight), Number(height), Number(age));
    const activityFactor = getAFactor(Number(activityLevel));
    const maintenanceCalories = Math.round(bmr * activityFactor);

    if (goal === "cut") {
      const totalCalsToLose = 3500 * Number(poundsChange);
      const targetDailyBurn = totalCalsToLose / Number(daysCutOrBulk);
      return Math.round(maintenanceCalories - targetDailyBurn);
    } else if (goal === "maintain") {
      
      return Math.round(maintenanceCalories);
    }
    else if (goal === "bulk") {
      const totalCalsToGain = (0.015 * poundsChange * 3500); 
      const targetDailyGain = totalCalsToGain / Number(daysCutOrBulk);
      return Math.round(maintenanceCalories + targetDailyGain);
    }
    
    
    return maintenanceCalories;
  };
  useEffect(() => {
    const calculatedLimit = calculateDailyCalorieLimit(
      age,
      height,
      weight,
      activityLevel,
      goal,
      daysCutOrBulk,
      poundsChange
    );
    setDailyCalorieLimit(calculatedLimit);
  }, [age, height, weight, activityLevel, goal, daysCutOrBulk, poundsChange]); 

  const saveProfile = async () => {
  if (auth.currentUser) {
    
    const calculatedLimit = calculateDailyCalorieLimit(
      age,
      height,
      weight,
      activityLevel,
      goal,
      daysCutOrBulk,
      poundsChange
    );

    const userProfile = {
      age,
      height,
      weight,
      activityLevel,
      goal,
      dailyCalorieLimit: calculatedLimit,
      daysCutOrBulk: goal === "maintain" ? null : daysCutOrBulk,
      poundsChange: goal === "maintain" ? null : poundsChange,
      cheatDays: goal !== "maintain" ? cheatDays : null,
      notificationFrequency,
    };

    try {
      await setDoc(
        doc(db, "userProfiles", auth.currentUser.uid),
        userProfile
      );
      setDailyCalorieLimit(calculatedLimit); 
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error writing document: ", error);
      alert("Error saving profile.");
    }
  } else {
    alert("No user is signed in to save profile.");
  }
};



  
  const getAFactor = (level) => {
    const activityFactors = [1.2, 1.375, 1.55, 1.725, 1.9];
    return activityFactors[level - 1] || 1.45;
  };

  
  const calculateBMR = (weight, height, age) => {
    
    return 10 * weight + 6.25 * height - 5 * age + 5;
  };

  
  const getMaintenanceCalories = () => {
    const bmr = calculateBMR(Number(weight), Number(height), Number(age));
    const activityFactor = getAFactor(Number(activityLevel));
    return Math.round(bmr * activityFactor);
  };

  
  const getDailyCalorieLimitForCut = () => {
    if (goal === "cut") {
      const totalCalsToLose = 3500 * Number(poundsChange);
      const targetDailyBurn = totalCalsToLose / Number(daysCutOrBulk);
      return getMaintenanceCalories() - targetDailyBurn;
    }
    if(goal === "bulk") {
      const totalCalsToGain = 3500 * Number(poundsChange);
      const targetDailyGain = totalCalsToGain / Number(daysCutOrBulk);
      return getMaintenanceCalories + targetDailyGain;
    }
    return getMaintenanceCalories(); 
  };

  return (
    <div>
      <h1  className="user-profile-title">Profile Settings</h1>
      <Header />
      <div className="user-profile">
        <h2>Your Saved Profile</h2>
        <p>Daily Calorie Limit: {dailyCalorieLimit}</p>
        <p>Age: {age}</p>
        <p>Height: {height} cm</p>
        <p>Weight: {weight} kg</p>
        <p>Activity Level: {activityLevel}</p>
        <p>Days Cut: {daysCutOrBulk}</p>
        <p>Pounds to Change: {poundsChange}</p>
        <p>
          Notification Frequency:{" "}
          {notificationFrequency === "off"
            ? "Notifications Off"
            : `Every ${notificationFrequency} hours`}
        </p>
      </div>
      <button onClick={toggleSettings} className="button">Change Profile Settings</button>
      <div className={`setting-section ${showSettings ? 'active' : ''}`}>
        <h2>Change Profile Settings</h2>
        <h2>Change Profile Settings</h2>
      <p>
        Enter your age:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          autocomplete="off"
        />
      </p>

      <p>
        Enter your height (in cm):
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          autocomplete="off"
        />
      </p>

      <p>
        Enter your weight (in kg):
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          autocomplete="off"
        />
      </p>

      <p>
        (Activity level key: 1- Sedentary (little to no exercise + work a desk
        job), 2- Lightly Active (light exercise 1-3 days / week), 3- Moderately
        Active (moderate exercise 3-5 days / week), 4- Very Active (heavy
        exercise 6-7 days / week), 5- Extremely Active (very heavy exercise,
        hard labor job, training 2x / day))
      </p>
      <p>
        Choose Activity Level:
        <select
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </p>

      <p>
        Notification settings:
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

      <p>
        Goal:
        <select value={goal} onChange={(e) => setGoal(e.target.value)}>
          <option value="">Select Goal</option>
          {/* <option value="bulk">Bulk</option> */}
          <option value="cut">Cut</option>
          <option value="maintain">Maintain</option>
        </select>
      </p>

      {goal !== "maintain" && (
        <>
          <p>
            Enter Days to {goal === "bulk" ? "Bulk" : "Cut"}:
            <input
              type="number"
              value={daysCutOrBulk}
              onChange={(e) => setDaysCutOrBulk(e.target.value)}
              autocomplete="off"
            />
          </p>

          <p>
            Enter Pounds to {goal === "bulk" ? "Gain" : "Lose"}:
            <input
              type="number"
              value={poundsChange}
              onChange={(e) => setPoundsChange(e.target.value)}
              autocomplete="off"
            />
          </p>
        </>
      )}

      {/* {goal && (
        <p>
          Enter Cheat Days:
          <input
            type="number"
            value={cheatDays}
            onChange={(e) => setCheatDays(e.target.value)}
            autocomplete="off"
          />
        </p>
      )}
      */}

      
<button
  onClick={() => {
    saveProfile();
    console.log(getDailyCalorieLimitForCut());
  }}
  className="button"
>
  Save Profile
</button>
<button onClick={sendEmail}>Sample Email</button>


      </div>
      <div>
        <br></br>
      </div>
      <div>
        <br></br>
      </div>
      <div>
        <br></br>
      </div>
      <div>
        <br></br>
      </div>
      <div>
        <br></br>
      </div>
      
      <Footer/>
      </div>
      
  );
}

export default RequireAuth(UserProfile);
