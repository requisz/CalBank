// src/components/MainPage.js

import React from "react";
import { useNavigate } from "react-router-dom";
import RequireAuth from "../RequireAuth";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Friends() {
  return (
    <div>
      <h1>Welcome to Calorie Bank</h1>
      <Header />
      <Footer />
    </div>
  );
}

export default RequireAuth(Friends);
