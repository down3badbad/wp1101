/****************************************************************************
  FileName      [ MineSweeper.js ]
  PackageName   [ src/containers ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ The control and main page of MineSweeper. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useState } from 'react';
import './MineSweeper.css';
import Board from '../components/Board'
import HomePage from '../components/HomePage'
import createBoard from '../util/createBoard';

const MineSweeper = () => {
    const [startGame, setStartGame] = useState(false);      // A boolean variable. If true, show the Board, else show the HomePage.
    const [mineNum, setMineNum] = useState(10);             // A integer variable to store the number of mines in the game. The default value is 10.
    const [boardSize, setBoardSize] = useState(8);          // A integer variable to store the board size in the game. The default value is 8.
    
    {/* Useful Hint: The four functions below only need to fill up with those three hook functions above. */}
    {/* -- TODO 1-2 -- */}
    const startGameOnClick = () => {
        if(startGame === false){
            setStartGame(true);
        }
    }
    {/* -- TODO 6-2 -- */}
    const mineNumOnChange = () => {
        
    }
    {/* -- TODO 6-2 -- */}
    const boardSizeOnChange = () => {
        
    }
    {/* -- TODO 5-2 -- */}
    const backToHomeOnClick = () => {
        
    }

    if(startGame === false){
        return( 
            <div className='mineSweeper'>  
                <HomePage startGameOnClick = {startGameOnClick}></HomePage>
                
            </div>
        );
    }
    else{
        return(
            <div className='mineSweeper'>  
                <Board mineNum = {mineNum} boardSize = {boardSize}></Board>
                <createBoard mineNum = {mineNum} boardSize = {boardSize}></createBoard>
        </div>
        );
    }
}
export default MineSweeper;