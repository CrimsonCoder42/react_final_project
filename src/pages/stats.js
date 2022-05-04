import React from "react"
import Home from './home';


const Stats = (props) => {
    return(
        // # guessed correctly & Average number of guesses needed 
    <div>
    <h1> Stats </h1>
    <p> Guessed correctly: { props.winCount } </p>
    <p> Average guesses needed: { props.average } </p>
    
    </div>)
}

export default Stats;