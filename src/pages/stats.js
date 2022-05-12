import React from "react"
import Home from './home';


const Stats = (props) => {

    const average =(correct, incorrect)=>{
        let total = correct + incorrect
        const avg = Math.floor((correct/(total)) * 100);
        console.log ("average:",avg);
        return avg;
      }

    return(
        // Breakdown of correct and incorrect by subject matter.  

    <>
    <h1> Stats </h1>
    <div id="statBoard"> 
    <div id="HTML">
    <h2> HTML </h2>
    <p> Incorrect: { props.htmlWrong } </p>
    <p> Correct: { props.htmlCorr } </p>
    <p> Percentage correct: { average(props.htmlCorr,props.htmlWrong) }%</p>
    </div>

    <div id="CSS">
    <h2> CSS </h2> 
    <p> Incorrect: { props.cssWrong } </p>
    <p> Correct: { props.cssCorr } </p>
    <p> Percentage correct: { average(props.cssCorr,props.cssWrong) }%</p>
    </div>

    <div id="JavaScript"> 
    <h2> JavaScript </h2>
    <p> Incorrect: { props.jsWrong } </p>
    <p> Correct: { props.jsCorr } </p>
    <p> Percentage correct: { average(props.jsCorr,props.jsWrong) }%</p>
    </div>

    <div id="React">
    <h2> React </h2>
    <p> Incorrect: { props.reactWrong } </p>
    <p> Correct: { props.reactCorr } </p>
    <p> Percentage correct: { average(props.reactCorr,props.reactWrong) }%</p>
    </div>
    </div>

    </>
    
    )
}

export default Stats;