import {React, useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';

import Navbar from "./components/navbar"
import Home from './pages/home';
import Settings from './pages/settings';
import Stats from './pages/stats';

function App() {

  const [gameNumber, setGameNumber] = useState(0);
  const [playerCount, setPlayerCount] = useState(0);
  const [corrCount, setcorrCount] = useState(0);
  const [wrongCount, setwrongCount] = useState(0);
  const [maxGuess, setMaxGuess] = useState(4);
  const [numPlayed, setNumPlayed] = useState([]);
  const [endRange, setEndRange]=useState(100);
 
  const average =()=>{
    
    const num = corrCount;
    const avg = (num/playerCount) * 100;
    console.log ("average:",num, playerCount, avg);
    return avg;
  }
 
  
  return (
    
    <Router>
    <div>
     
      <Navbar />
    <div className="App">
    
      <Routes>
      <Route path="/" element={ <Home setPlayerCount={setPlayerCount} setcorrCount={setcorrCount} corrCount={corrCount} setwrongCount={setwrongCount} wrongCount={wrongCount} endRange={endRange} setNumPlayed ={setNumPlayed} maxGuess={maxGuess}/> } />
      <Route path="/settings" element={ <Settings maxGuess={maxGuess} setMaxGuess={setMaxGuess} endRange={endRange} setEndRange={setEndRange}/> }/>
      <Route path="/stats" element={ <Stats playerCount={playerCount} corrCount={corrCount} wrongCount={wrongCount} average={average()}/> }/>
      </Routes>

    </div>
    </div>
    </Router>
)}


export default App;
