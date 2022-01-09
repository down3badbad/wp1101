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
//   justify-content: center;
//   flex-direction: column;
  flex-wrap: wrap;
`;

export default function Body2() {
    // Audo
    const [audio, setAudio] = useState("");
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    
    //Parameters
    const [speed, setSpeed] = useState(1.0);
    const [timeDuration, setTimeDuration] = useState(0.0);

    //Status
    const [status, setStatus] = useState("convert");
    const [hasDone, sethasDone] = useState(false);
    const [convertedAudio, setconvertedAudio] = useState("");
    
    const handleChange = (func) => (event) => {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
        let urlObj;
        if(event.target.files[0] !== null){
            urlObj = URL.createObjectURL(event.target.files[0]);
            func(urlObj);
        }
        let temp = document.getElementById("audio");
        temp.onloadedmetadata = function() {
            setTimeDuration(temp.duration);
        };
    };

    //Done calculation pop out additional DOM
    const DoneAudio = (
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
        console.log(`time duration is ${timeDuration}`)
        console.log("uploading to audio to backend.. waiting for response");
        setStatus("Loading");
        const formData = new FormData();  
        formData.append('file' ,file);
        formData.append('fileName' , fileName);
        formData.append('speed', speed);
        formData.append('timeDuration', timeDuration);
  
        const res = await axios.post('/api/speed-adjustment', formData , {
          headers: {'Content-Type': 'multipart/form-data; '},
        });
        
        console.log("received based64 string as processed audio");
        const audio = res.data.snd;
        setconvertedAudio(`data:audio/mp3;base64,${audio}`);
        setStatus("Convert");
        sethasDone(true);
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
            <div id="speed_adjust_text">Speed Adjustment:</div>

            <div id ="adjust_speed_div">       
                {/* <div className="adjust_speed_button">   */}
                <button id = "b1" onClick = {decrement} disabled={speed<= 0.25}>-</button>       
                {/* </div> */}
                <div id="current_speed_display" > {speed} </div>
                {/* {speed} */}
                {/* <div className="adjust_speed_button"> */}
                <button id = "b2" onClick = {increment} disabled={speed >= 2.5}>+</button>  
                {/* </div> */}
            </div>

            <div id="supported_text">Supported audio file format: MP3, WAV</div>
            <div id="convert_button">
                <Button size = "large" variant="contained"  onClick={uploadAudio}
                    style={{ width: 160, height: 70 }} >
                    {status}
                </Button>
            </div>
            
            {hasDone ? DoneAudio : null}

            {/* 
            
            <Typography variant = "p" component = "p" align = "center">Supported audio file format: MP3, WAV</Typography>
            <Typography variant = "p" component = "p" align = "center">Speed Adjustment: </Typography>

            
             */}

        </Wrapper>
    )
}