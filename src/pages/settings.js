import {React, useState} from "react"


// settings can't be changed via input 
const Settings = (props) => {
    const [maxGuess, setMaxGuess]=useState(props.maxGuess);
    const [endRange, setEndRange]=useState(props.endRange);
    const setMaxGuessClick=(e)=>{
        const val = e.target.value;
        console.log("setMaxGuessClick", val);
        setMaxGuess(val)
        props.setMaxGuess(val);
    }
    const setEndRangeClick=(e)=>{
        const val = e.target.value;
        console.log("setEndRangeClick", val);
        setEndRange(val);
        props.setEndRange(val);
    }
    
    return(<div>
    
        <h1> Settings </h1>
        <p>Max Guesses: <input type='text' value={props.maxGuess} onChange={setMaxGuessClick}/></p>
        
        <p>End Range: <input type='text' value={props.endRange} onChange={setEndRangeClick}/></p>
        
        </div>
    )
}

export default Settings;