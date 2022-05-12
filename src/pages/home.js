import React from 'react';
import { useState } from 'react';

function Home(props) {
   
  const [GameAnswer, setGameAnswer] = useState(" ");
  const [gameMessage, setGameMessage] = useState(" ")
  const [playerCount, setPlayerCount] = useState(0);
  const [corrCount2, setcorrCount2] = useState(props.corrCount);
  const [wrongCount2, setwrongCount2] = useState(props.wrongCount);
  const [numPlayed, setNumPlayed] = useState(1);
  const [questSubj, setquestSubj] = useState(" ");
  const [cssCorr2, setCssCorr2] = useState(props.cssCorr);
  const [cssWrong2, setCssWrong2] = useState(props.cssWrong);
  const [htmlCorr2, setHtmlCorr2] = useState(props.htmlCorr);
  const [htmlWrong2, setHtmlWrong2] = useState(props.htmlWrong);
  const [jsCorr2, setJsCorr2] = useState(props.jsCorr);
  const [jsWrong2, setJsWrong2] = useState(props.jsWrong);
  const [reactCorr2, setReactCorr2] = useState(props.reactCorr);
  const [reactWrong2, setReactWrong2] = useState(props.reactWrong);
  
  let data=[];
  //uses google sheets API for questions and answer key. This makes it easier to change and add as needed. 
  function init() {
    
    const sheetId = '1UFj3u1xT2_pdMENQP8qs8ck-EEp_tuTtV5zn6XP0E7k';
    const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
    const sheetName = 'QandA';
    const query = encodeURIComponent('Select *')
    const url = `${base}&sheet=${sheetName}&tq=${query}`
    // Use fetch to access QandA sheet in google sheets. 
      fetch(url)
          .then(res => res.text())
          .then(rep => {
              //Remove additional text and extract only JSON:
              const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
              let rows = jsonData.table.rows
            
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
             const newSubj = data[data.length -1];
              setquestSubj(newSubj);
          })
  
  }

  function setPlay(arr) {
    let optionsArray = [] 
    changeElement("play",'hidden', 'className')
    changeElement("board",'board', 'className')
      // answer located -2 from the end of any passed in array.
      let answer = arr[arr.length -2]
      setGameAnswer(answer)
      //slice array so only answer options are left
      optionsArray = arr.slice(1, -2)
      
      // question display.
        changeElement("questDisplay",arr[0], 'innerText')
      // loop over all buttons to clear text and hide via className. 
      let btnArr = ['A','B','C','D']
      btnArr.forEach(ele => {
        changeElement(ele,' ', 'innerText')
        changeElement(ele,'hidden', 'className')
      })

      // loop over all buttons and show buttons relative to options.
      for(let i = 0; i < optionsArray.length; ++i ) {
        changeElement(btnArr[i], optionsArray[i], 'innerText')
        changeElement(btnArr[i],'btn', 'className')
    }
      
  }

  //Compares the player click vs the correct answer and sets time out of 3 seconds before asking another question. 
  function playerGuessed(e) {
    setTimeout(() => {
        init();
        data = [];
        setGameMessage(" ")
    }, 3000)
      let playerGuess = e.target.id;
    if (playerGuess === GameAnswer){
        changeElement(playerGuess,"green", 'className')
        setCorr(questSubj)
        setGameMessage("Correct");   
    } else if (playerGuess !== GameAnswer) {
        changeElement(GameAnswer,"green", 'className')
        changeElement(playerGuess,"red", 'className')
        setWrong(questSubj)
        setGameMessage("Incorrect")
  }
        setNumPlayed( numPlayed + 1)
   }

   //Locates all elements by ID and changes elements className or innertext.
   function changeElement(id, name, change) {
     if (change == 'className') {
      document.getElementById(id).className = name;
     } else {
      document.getElementById(id).innerText = name;
     }
   }

   //monitors all correct answers by subject and sets the state accordingly.
   function setCorr(subject){
    if(subject == 'CSS') {
      const newCount = cssCorr2 + 1;
      setCssCorr2(newCount);
      props.setCssCorr(newCount);
    } else if(subject == 'HTML') {
      const newCount = htmlCorr2 + 1;
      setHtmlCorr2(newCount);
      props.setHtmlCorr(newCount);
    } else if(subject == 'JavaScript') {
      const newCount = jsCorr2 + 1;
      setJsCorr2(newCount);
      props.setJsCorr(newCount);
    } else {
      const newCount = reactCorr2 + 1;
      setReactCorr2(newCount);
      props.setReactCorr(newCount);
    }
   }

//monitors all wrong answers by subject and sets the state accordingly.
  function setWrong(subject){
    if(subject == 'CSS') {
      const newCount = cssWrong2 + 1;
      setCssWrong2(newCount);
      props.setCssWrong(newCount);
    } else if(subject == 'HTML') {
      const newCount = htmlWrong2 + 1;
      setHtmlWrong2(newCount);
      props.setHtmlWrong(newCount);
    } else if(subject == 'JavaScript') {
      const newCount = jsWrong2 + 1;
      setJsWrong2(newCount);
      props.setJsWrong(newCount);
    } else {
      const newCount = reactWrong2 + 1;
      setReactWrong2(newCount);
      props.setReactWrong(newCount);
    }
  }

    return(
        <div>

    <div id="message" className="message">{ gameMessage }</div>

    <div className="hidden" id ='board'> 
    <div id="questDisplay" className="questions"></div>
    
    <div className="answers">
        
        <button onClick={playerGuessed} type="button" id='A' className="btn"></button>
        <button onClick={playerGuessed} type="button" id='B' className="btn"></button>
        <button onClick={playerGuessed} type="button" id='C' className="btn"></button>
        <button onClick={playerGuessed} type="button" id='D' className="btn"></button>

        </div>

    </div>
        <button onClick={init} type="button" id='play' className="btn">Let's Study</button>

    </div>
    )
}

export default Home;