import { Button } from '@mui/material';
import styled from 'styled-components';
import img from './eg_file/title1.jpg';
import './Body2.css';
// import handel from './eg_file/handel.wav'
// import chord from './eg_file/Chord.wav'
// import sample from './eg_file/sample.wav'
import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import axios from '../api';

const Wrapper = styled.section`
  margin: auto;
  width: 80%;
  height: 65vh;
  border: 2px solid blue;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
`;

export default function Body2() {
    // Audo
    const [audio, setAudio] = useState("");
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    
    //Parameters
    const [speed, setSpeed] = useState(1.0);

    //Status
    const [status, setStatus] = useState("convert");
    const [hasDone, sethasDone] = useState(false);
    const [convertedAudio, setconvertedAudio] = useState("");
    
    const handleChange = (func) => (event) => {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
        if(event.target.files[0] !== null){
        const urlObj = URL.createObjectURL(event.target.files[0]);
        func(urlObj);
        }
    };

    //Done calculation pop out additional DOM
    const DoneAudio = (
        <div>
            <div>
                <p>Adjusted Audio:</p>
            </div>
            <Button size = "large" variant="contained" color="success" >
                <a href = {convertedAudio} download = {fileName.replace('./wav', '') + "_adjusted.wav"}>Download</a>
            </Button> 
            <audio src = {convertedAudio} controls></audio>
        </div>
    );

    const increment = () => {
        setSpeed(speed + 0.25);
        // isDisabled1();
    }
    const decrement = () => {
        setSpeed(speed - 0.25);
        // isDisabled2();
    }

    // const isDisabled1 = () => {
    //     const test = document.getElementById("b1");
    //     if(speed === 3) test.disabled = true;
    //     else test.disabled = false;
    // }

    // const isDisabled2 = () => {
    //     const test = document.getElementById("b2");
    //     if(speed === 0.25) test.disabled = true;
    //     else test.disabled = false;
    // }

    const uploadAudio = async () => {
        console.log("uploading to audio to backend.. waiting for response");
        setStatus("Loading");
        const formData = new FormData();  
        formData.append('file' ,file);
        formData.append('fileName' , fileName);
        formData.append('speed', speed);
  
        const res = await axios.post('/api/speed-adjustment', formData , {
          headers: {'Content-Type': 'multipart/form-data; '},
        });
        
        console.log("received based64 string as processed audio");
        const audio = res.data.snd;
        setconvertedAudio(`data:audio/wav;base64,${audio}`);
        setStatus("Convert");
        sethasDone(true);
      }
  

    return(
        <Wrapper>
            <div className ="container">            
                <button id = "b1" onClick = {increment}>+</button>  
                <h2 id="counting"> {speed} </h2>
                <button id = "b2" onClick = {decrement}>-</button>         
            </div>
             <div>
                <h2>Upload Audio File</h2>
            </div>
            <div>
                <p>Audio Sample:</p>
                <select className = "selbar">
                <option value = "Chord" >Chord</option>
                <option value = "handel">Handel</option>
                <option value = "sample">Sample</option>
                </select>
            </div>
            <audio preload = "auto" src = {audio} controls></audio>
            <input type="file" id="input_aud" accept = ".mp3,.wav" onChange={handleChange(setAudio)}>
            </input>
            <Typography variant = "p" component = "p" align = "center">Supported audio file format: MP3, WAV</Typography>
            <Typography variant = "p" component = "p" align = "center">Speed Adjustment: </Typography>
            <Button size = "large" variant="contained" color="success" onClick={uploadAudio} >
                {status}
            </Button>
            {hasDone ? DoneAudio : null}

        </Wrapper>
    )
}