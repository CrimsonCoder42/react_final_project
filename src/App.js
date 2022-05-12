import {React, useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';

import Navbar from "./components/navbar"
import Home from './pages/home';
import Stats from './pages/stats';

function App() {

  const [playerCount, setPlayerCount] = useState(0);
  const [corrCount, setcorrCount] = useState(0);
  const [wrongCount, setwrongCount] = useState(0);
  const [numPlayed, setNumPlayed] = useState([]);
  const [endRange, setEndRange]=useState(100);
  const [questSubj, setquestSubj] = useState(" ");
  const [cssCorr, setCssCorr] = useState(0);
  const [cssWrong, setCssWrong] = useState(0);
  const [htmlCorr, setHtmlCorr] = useState(0);
  const [htmlWrong, setHtmlWrong] = useState(0);
  const [jsCorr, setJsCorr] = useState(0);
  const [jsWrong, setJsWrong] = useState(0);
  const [reactCorr, setReactCorr] = useState(0);
  const [reactWrong, setReactWrong] = useState(0);


  
  
  return (
    
    <Router>
    <div>
     
      <Navbar />
    <div className="App">
    
      <Routes>
      <Route path="/" element={ 
      <Home 
      setPlayerCount={setPlayerCount} 
      setcorrCount={setcorrCount} 
      corrCount={corrCount} 
      setwrongCount={setwrongCount} 
      wrongCount={wrongCount} 
      endRange={endRange} 
      setNumPlayed ={setNumPlayed} 
      questSubj={questSubj} 
      setquestSubj={setquestSubj}
      setCssCorr={setCssCorr} cssCorr={cssCorr} 
      setCssWrong={setCssWrong} cssWrong={cssWrong} 
      setHtmlCorr={setHtmlCorr} htmlCorr={htmlCorr} 
      setHtmlWrong={setHtmlWrong} htmlWrong={htmlWrong} 
      setJsCorr={setJsCorr} jsCorr={jsCorr}
      setJsWrong={setJsWrong} jsWrong={jsWrong} 
      setReactCorr={setReactCorr} reactCorr={reactCorr} 
      setReactWrong={setReactWrong}  reactWrong={reactWrong}   
      /> 
      } />
      <Route path="/stats" element={ 
      <Stats 
      playerCount={playerCount} 
      corrCount={corrCount} 
      wrongCount={wrongCount} 
      questSubj={questSubj} 
      cssCorr={cssCorr}
      cssWrong={cssWrong}
      htmlCorr={htmlCorr}
      htmlWrong={htmlWrong}
      jsCorr={jsCorr}
      jsWrong={jsWrong}
      reactCorr={reactCorr}
      reactWrong={reactWrong} /> 
      }/>
      </Routes>

    </div>
    </div>
    </Router>
)}


export default App;
