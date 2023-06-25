import { useEffect, useState } from "react";
import "./App.css";
import SignIn from "./SignUp";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
