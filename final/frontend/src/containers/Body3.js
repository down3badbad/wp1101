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
    border: 2px solid gray;
    flex-wrap: wrap;
    width: 72%;
    height: 65vh;
    display: flex;
    flex-direction: row;
    position: relative;
    left: 20%;
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
    const [timeDuration, setTimeDuration] = useState(0.0);

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
        let temp = document.getElementById("audio");
        temp.onloadedmetadata = function() {
            setTimeDuration(temp.duration);
        };
    };

    //Done calculation pop out additional DOM
    const DoneAudio = (
        // <div>
        //     <div>
        //     <p>Adjusted Audio:</p>
        //     </div>
        //     <Button size = "large" variant="contained" color="success" >
        //         <a href = {convertedAudio} download = {fileName + "_adjusted.wav"}>Download</a>
        //     </Button> 
        //     <audio src = {convertedAudio} controls></audio>
        // </div>
        <div id="done_audio_div">
            <div id="adjusted_audio_text">
                Adjusted Audio:
            </div>
            <div id="done_audio">
                <audio src = {convertedAudio} controls></audio>
            </div>
            <Button id="download_button" size = "large" variant="contained" color="success" style={{ width: 120, height: 60 }} >
                <a href = {convertedAudio} download = {fileName.replace('./wav', '') + "_adjusted.wav"}>Download</a>
            </Button> 
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
        formData.append('timeDuration', timeDuration);

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
        setDecay(event.target.value * 0.1);
        console.log(decay);
    }

    const updateMode = () => (event) => {
        setMode(event.target.value);

        // if (event.target.value == "reduction") {
        //     document.getElementById("reduction_button1").variant = "contained";
        //     document.getElementById("enhancement_button1").variant = "outlined";
        // }
        // else {
        //     document.getElementById("reduction_button1").variant = "outlined";
        //     document.getElementById("enhancement_button1").variant = "contained";
        // }
    }

    return(
        <Wrapper>
             <div id="title">
                <p id="top_title">Upload Audio File</p>
            </div>
            <div id="audio_sample">
                <p className="audio_sample_text">Audio Sample:</p>
                <div className = "selbar_div">
                    <div id="selbar1">
                        <select id="selbar">
                            <option value = "Chord" >Chord</option>
                            <option value = "handel">Handel</option>
                            <option value = "sample">Sample</option>
                        </select>
                    </div>
                    <div id="input_aud1">
                        <input type="file" id="input_aud" accept = ".mp3,.wav" onChange={handleChange(setAudio)} />
                    </div>
                </div>
                <div id="audio_div">
                    <audio id="audio" preload = "auto" src = {audio} controls></audio>
                </div>
            </div>
            <div id="mode_adjust_text">Mode:</div>
            <div id="mode_select_div">
                <div id="reduction_button">
                    <Button size = "large" variant='contained'  id="reduction_button1" value = "reduction" onClick={updateMode()}
                        style={mode!='reduction'? { width: 160, height: 70, backgroundColor:"#70D1D0", color:"black"}
                        : { width: 160, height: 70, backgroundColor:"#008080", color:"white"}} >
                        Reduction
                    </Button>
                </div>
                <div id="enhancement_button">
                    <Button size = "large" variant='contained' id="enhancement_button1" value = "enhancement" onClick={updateMode()}
                        style={mode=='reduction'? { width: 160, height: 70, backgroundColor:"#e84855", color:"black"}
                               : { width: 160, height: 70, backgroundColor:"#9a0001", color:"white"}} >
                        Enhancement
                    </Button>
                </div>
            </div>
            <div id="supported_text">Supported audio file format: MP3, WAV</div>
            <div id="convert_button">
                <Button size = "large" variant="contained"  onClick={uploadAudio}
                    style={{ width: 160, height: 70 }} >
                    {status}
                </Button>
            </div>
            
            <div className="slider_container1">
                Filter Size:
                <div className="slider1">
                    <input type = "range" min="7" max="25" onChange={updateSize()}/>
                </div>
            </div>
            <div className="slider_container2">
                Sigma Magnitude:
                <div className="slider2">
                    <input type = "range" min="1" max="30" onChange={updateDecay()}/>
                </div>
            </div>
            {hasDone ? DoneAudio : null}
        </Wrapper>
    )
}