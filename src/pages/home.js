import React from 'react';
import { useState } from 'react';


function Home(props) {
   
  const [gameNumber, setGameNumber] = useState(props.gameNumber);
  const [disable, setDisable] = useState(false);
  const [gameMessage, setGameMessage] = useState(" ")
  const [playerNum, setPlayerNum] = useState(" ");
  const [playerCount, setPlayerCount] = useState(0);
  const [corrCount2, setcorrCount2] = useState(props.corrCount);
  const [wrongCount2, setwrongCount2] = useState(props.wrongCount);
  const [numPlayed, setNumPlayed] = useState([]);

  init();
  const data=[];
  let answer;
  //store wrong answer index in array.
  const incorrect =[];  

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
            console.log('HIT')
              //picks random number between 0 and number of Rows 
              // change this a conditional if toggled for wrong answer indexes. or randomize through errors. or create another array to pull from. 
              let radom = Math.floor(Math.random() * rows.length)

              // selects single row at index of radom 
              let rRow = rows[radom].c;

              //filter out all elements containing null from selected row.
              const results = rRow.filter(element => {
                  return element !== null;
                });
               //take remaining data and push to global array 'data'.
             for(let i = 0; i < results.length; i++ ) {
                 data.push(results[i].v) 

             }
             //call setPlay and pass in the cleaned question and options. 
             setPlay(data)
             console.log(data)
          })
  
  }

  function setPlay(arr) {
      // answer located -2 from the end of any passed in array.
      let ansPos = arr.length -2
      answer = arr[ansPos]
      console.log('setPlay',answer) 

      //slice array so only answer options are left
      let optionsArray = arr.slice(1, -2)
      
      // question display.
      document.getElementById("questDisplay").innerText = `${arr[0]}`

      // loop over all buttons to clear text and hide via className. 
      let btnArr = ['A','B','C','D']
      btnArr.forEach(ele => {
        document.getElementById(ele).innerText = ''
        document.getElementById(ele).className = 'hidden'
      })

      // loop over all buttons and show buttons relative to options.
      for(let i = 0; i < optionsArray.length; ++i ) {
        document.getElementById(btnArr[i]).innerText = `${optionsArray[i]}`
        document.getElementById(btnArr[i]).className = 'btn'
    }
      
  }
  
  const playerGuessed = (e) => {
      console.log('playerGuessed',answer)
      let playerGuess = e.target.id;
    if (playerGuess === answer){
        const newCount = corrCount2 + 1;
        setcorrCount2(newCount);
        props.setcorrCount(newCount);
        setGameMessage("Correct!");
        setDisable(true);
        
    } else if (playerGuess !== answer) {
        const wrgCount = wrongCount2 + 1;
        setwrongCount2(wrgCount);
        props.setwrongCount(wrgCount);
        setGameMessage("Sorry incorrect!")

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

    return(
        <div>
    <div id="game-message"> <div id="game-text"><button onClick={playAgain}>Play again?</button></div> </div>

    <div id="message" className="message">{ gameMessage }</div>

    <div className="board"> 
    <div id="questDisplay" className="questions"></div>
    
    <div className="answers">
        
        <button onClick={playerGuessed} type="button" id='A' className="btn"></button>
        <button onClick={playerGuessed} type="button" id='B' className="btn"></button>
        <button onClick={playerGuessed} type="button" id='C' className="btn"></button>
        <button onClick={playerGuessed} type="button" id='D' className="btn"></button>

        </div>
    </div>


    </div>
    )
}

export default Home;