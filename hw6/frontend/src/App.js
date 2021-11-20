import { useState, Fragment } from "react";
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');

  const handleGuess = async() => {
    const response = await guess(number);

    if(response === 'Equal') setHasWon(true)
    else{
      setStatus(response)
      setNumber('')
    }
  }

  const check_input = () => {
    let val = document.getElementById('user_input').value;
    if(!isNaN(val)) {
      setNumber(val);
      document.getElementById('gg').disabled = false;
    }
    else document.getElementById('gg').disabled = true;
  }


  const start = async() => {
    setHasStarted(true);
    startGame();
  }

  const res = async() => {
    setHasWon(false);
    restart();
  }

  const startMenu = 
  <div>
    <button onClick = {start}> start game </button>
  </div>

  const gameMode = 
  <>
    <p>Guess a number between 1 to 100</p>
    <input id = "user_input" onChange = {check_input}> 
    </input>
    <button onClick = {handleGuess} id = "gg" disabled = {!number}>
      guess!
    </button>
    <p>
      {status}
    </p>
  </>

  const winningMode = 
  <>
    <p>you won! the number was {number}.</p>
    <button onClick = {res} >restart</button>
  </>

  const game = 
  <div>
    {hasWon ? winningMode : gameMode}
  </div>
  return <div className = "App">
    {hasStarted ? game : startMenu}
  </div>
}

export default App