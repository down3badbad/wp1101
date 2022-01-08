import { Button } from '@mui/material';
import styled from 'styled-components';
import img from './eg_file/title1.jpg';
import './Body3.css';
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


export default function Body3() {
    //Audio
    const [audio, setAudio] = useState("");
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("");
    
    //Parameters
    const [mode, setMode] = useState("reduction");
    const [size, setSize] = useState(10);
    const [decay, setDecay] = useState(1);

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
                <a href = {convertedAudio} download = {fileName + "_adjusted.wav"}>Download</a>
            </Button> 
            <audio src = {convertedAudio} controls></audio>
        </div>
    );


    const uploadAudio = async () => {
        console.log("uploading to audio to backend.. waiting for response")
        setStatus("Loading");
        const formData = new FormData();  
        formData.append('file' ,file);
        formData.append('fileName' , fileName);
        formData.append('mode', mode);
        formData.append('intervalSize', size);
        formData.append('decaySpeed', decay);

        const res = await axios.post('/api/reduction-enhancement', formData , {
            headers: {'Content-Type': 'multipart/form-data; '},
        });

        console.log("received!");
        console.log(res.data.snd);
        const audio = res.data.snd;
        setStatus("Convert");
        setconvertedAudio(`data:audio/wav;base64,${audio}`);
        sethasDone(true);
    }
  
    const updateSize = () => (event) => {
        console.log(size);
        setSize(event.target.value);
    }

    const updateDecay = () => (event) => {
        setDecay(event.target.value);
    }

    const updateMode = () => (event) => {
        setMode(event.target.value);
    }

    return(
        <Wrapper>
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
        <Button size = "large" variant="contained" color="success" onClick={uploadAudio}>
            {status}
        </Button>
        <Button size = "large" value = "reduction" variant="contained" color="success" onClick = {updateMode()}>
            Reduction
        </Button>
        <Button size = "large" value = "enhancement" variant="contained" color="success" onClick = {updateMode()}>
            Enhancement
        </Button>
        <div className="container">
            <div className="slider">
                <input type = "range" min="7" max="25" onChange={updateSize()}/>
            </div>
        </div>
        <div className="container">
            <div className="slider">
                <input type = "range" min="0.1" max="3" onChange={updateDecay()}/>
            </div>
        </div>
        {hasDone ? DoneAudio : null}
        </Wrapper>
    )
}