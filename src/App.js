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
  const [winCount, setWinCount] = useState(0);
  const [maxGuess, setMaxGuess] = useState(4);
  const [numPlayed, setNumPlayed] = useState([]);
  const [endRange, setEndRange]=useState(100);
 
  const average =()=>{
    
    const num = winCount;
    const avg = playerCount/num;
    console.log ("average:",num, playerCount, avg);
    return avg;
  }
 
  
  return (
    
    <Router>
    <div>
     
      <Navbar />
    <div className="App">
    
      <Routes>
      <Route path="/" element={ <Home setPlayerCount={setPlayerCount} setWinCount={setWinCount} winCount={winCount} endRange={endRange} setNumPlayed ={setNumPlayed} maxGuess={maxGuess}/> } />
      <Route path="/settings" element={ <Settings maxGuess={maxGuess} setMaxGuess={setMaxGuess} endRange={endRange} setEndRange={setEndRange}/> }/>
      <Route path="/stats" element={ <Stats playerCount={playerCount} winCount={winCount} average={average()}/> }/>
      </Routes>

    </div>
    </div>
    </Router>
)}


export default App;
