import React from 'react';
import { useState } from 'react';


function Home(props) {
   
  const [gameNumber, setGameNumber] = useState(props.gameNumber);
  const [disable, setDisable] = useState(false);
  const [gameMessage, setGameMessage] = useState(" ")
  const [playerNum, setPlayerNum] = useState(" ");
  const [playerCount, setPlayerCount] = useState(0);
  const [winCount2, setWinCount2] = useState(props.winCount);
  const [numPlayed, setNumPlayed] = useState([]);

  init();
  const data=[];
  function init() {
    
    const sheetId = '1UFj3u1xT2_pdMENQP8qs8ck-EEp_tuTtV5zn6XP0E7k';
    const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
    const sheetName = 'QandA';
    
    const query = encodeURIComponent('Select *')
    const url = `${base}&sheet=${sheetName}&tq=${query}`
      fetch(url)
          .then(res => res.text())
          .then(rep => {
              //Remove additional text and extract only JSON:
              const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
              let rows = jsonData.table.rows
              let radom = Math.floor(Math.random() * rows.length)
              let rRow = rows[radom].c;
              const results = rRow.filter(element => {
                  return element !== null;
                });
             for(let i = 0; i < results.length; i++ ) {
                 data.push(results[i].v) 
             }
             setPlay(data)
          })
  
  }

  function setPlay(arr) {
      let newArray = arr.slice(1, -2)

      document.getElementById("questDisplay").innerText = `${arr[0]}`
      let btnArr = ['A','B','C','D']
      btnArr.forEach(ele => {
        document.getElementById(ele).innerText = ''
        document.getElementById(ele).className = 'hidden'
      })

      for(let i = 0; i < newArray.length; ++i ) {
        document.getElementById(btnArr[i]).innerText = `${newArray[i]}`
        document.getElementById(btnArr[i]).className = 'btn'
    }
      
  }



  const playerGuessed = (e) => {
    console.log(e.target.id);
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

    <div id="questDisplay" className="questions"></div>
    <div className="board"> 
        
        <button onClick={playerGuessed} type="button" id='A' className="btn"></button>
        <button onClick={playerGuessed} type="button" id='B' className="btn"></button>
        <button onClick={playerGuessed} type="button" id='C' className="btn"></button>
        <button onClick={playerGuessed} type="button" id='D' className="btn"></button>
        
    </div>


    </div>
    )
}

export default Home;