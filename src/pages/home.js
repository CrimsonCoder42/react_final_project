import React from 'react';
import { useState } from 'react';


function Home(props) {
    //const 
//UseState to handle playerNum, gameNumber, numPlayed, and how many guess. 
  const [gameNumber, setGameNumber] = useState(props.gameNumber);
  const [disable, setDisable] = useState(false);
  const [gameMessage, setGameMessage] = useState(" ")
  const [playerNum, setPlayerNum] = useState(" ");
  const [playerCount, setPlayerCount] = useState(0);
  const [winCount2, setWinCount2] = useState(props.winCount);
  const [numPlayed, setNumPlayed] = useState([]);

  const playerGuessed = (n) => {
    setPlayerNum(n.target.value)
  }

  function visibleMessage(color) {
    const message = document.getElementById("game-message")
    const text = document.getElementById("game-text")
    message.style.visibility = "visible";
    message.style.backgroundColor = color;
    text.style.backgroundColor = color;
}

  const buttonPress = () => { 

    // change 4 to imported variable from settings route. 
    if(playerCount < props.maxGuess) {
        const pn =  parseInt(playerNum);
        const gn =  parseInt(gameNumber);
        
        if(pn===gn)
        {  
            const newCount = winCount2+1;
            console.log("newcount: ", newCount);
            setWinCount2(newCount);
            console.log("home:" , winCount2)
            props.setWinCount(newCount);
            
            setGameMessage("You Win!");
            visibleMessage('green');
            setDisable(true);
        }
        else if (playerCount+1 >= props.maxGuess) {
            setGameMessage("Game Over!")
            visibleMessage('red')
            setDisable(true);
        }
        else if (pn < gn)
        {
            setGameMessage("Higher!");
            
        }else {
            setGameMessage("Lower!");
        }
    //   console.log(playerNum)
    //   console.log(gameNum)
    } else {
      setGameMessage("Game Over!")
      visibleMessage('red')
      setDisable(true);
    }
   
    const pc = playerCount +1;
    setPlayerCount(pc);
    setNumPlayed([...numPlayed, playerNum])
    props.setNumPlayed([...numPlayed, playerNum])
    props.setPlayerCount(pc);
  } 

  function playAgain() {
    const message = document.getElementById("game-message")
    message.style.visibility = "hidden";
    setDisable(false);
    setGameMessage("");
    setPlayerCount(0);
    setNumPlayed([]);
    console.log ("endRange: ", props.endRange);
    setGameNumber(Math.floor(Math.random() * props.endRange) + 1);
  }

  function hideShow() {
    const gameNum = document.getElementById('game-number')
    const cheatBtn = document.getElementById('cheat')
    if (gameNum.className == 'show') {
        gameNum.className = 'hidden'
        cheatBtn.innerText = 'Cheat'
    } else {
        gameNum.className = 'show'
        cheatBtn.innerText = 'Hide'
    }
  }

    return(
        <div>
    <div id="game-message"> <div id="game-text"><h1> { gameMessage } </h1><button onClick={playAgain}>Play again?</button></div> </div>

    <div className="questions"><h1>Hello</h1></div>
        
    <div className="answer-buttons" > 
        <div className= "ansBtn" id="A"><h3>A</h3></div>
        <div className= "ansBtn" id="B"><h3>B</h3></div>
        <div className= "ansBtn" id="C"><h3>C</h3></div>
        <div className= "ansBtn" id="D"><h3>D</h3></div>
        
    </div>


    </div>
    )
}

export default Home;