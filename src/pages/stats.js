import React from "react"
import Home from './home';


const Stats = (props) => {
    return(
        // # guessed correctly & Average number of guesses needed 
    <div>
    <h1> Stats </h1>
    <p> Correct: { props.corrCount } </p>
    <p> Percentage of correct answers: { props.average }% </p>
    <p> Wrong: { props.wrongCount } </p>
    
    
    </div>)
}

export default Stats;