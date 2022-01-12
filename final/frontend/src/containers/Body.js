import { Button } from '@mui/material';
import styled from 'styled-components';
import img from './eg_file/body_init.jpg';
import './img-wrapper.css';
import b from './eg_file/handel.wav'
import a from './eg_file/Chord.wav'
import c from './eg_file/sample.wav'
import { useState, useEffect } from 'react'
import axios from '../api';
import './Body.css'

const Wrapper = styled.section`
  width: 72%;
  height: 66vh;
  display: flex;
  flex-direction: row;
  position: relative;
  left: 23%;
`;

const Left = styled.div`
  float:left;
  height:100%;
  width: 70%;
  border-style: groove;
  overflow-x: scroll;
`;

const Right = styled.div`
  height:100%;
  width: 30%;
  border-style: ridge;
`;


export default function Body() {
    const [file, setFile] = useState(null);
    const [audio, setAudio] = useState(a);
    const [timeDuration, setTimeDuration] = useState(0.0);

    const retrieveBlob = async (x, fn) => {
      let blob = await fetch(x).then(r => r.blob());
      let file = new File([blob], fn, { type: "audio/wav" });
      setFile(file);
      let temp = document.getElementById("audio");
      temp.onloadedmetadata = function() {
        setTimeDuration(temp.duration);
    };
  }
  
    //Retrieve one time
    if(file === null) {
        retrieveBlob(a, "Chord.wav");
    }

    //Initialize sample audio
    const sample_sound = [a, b, c];
    const sample_filename = ["Chord.wav", "handel.wav", "sample.wav"];

    const [image, setImage] = useState(img);
    const [imageWidth, setImageWidth] = useState("400");
    const [status, setStatus] = useState("Analyse");
    const [fileName,setFileName] = useState("title.jpg");
  
    const [lowerfreq, setlowerfreq] = useState(0);
    const [upperfreq, setupperfreq] = useState(2000);
    const [lowerfreqImg, setlowerfreqImg] = useState(0);
    const [upperfreqImg, setupperfreqImg] = useState(0);

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
    const DoneImage = (
      <div style={{position:"absolute", left:"77%", top: "90%"}}>
        <Button id="download_button" size = "large" variant="contained" color="info" style={{ width: 170, height: 45 }} >
            <a style={{fontSize:"12px"}} href = {image} download = {fileName.split(".")[0] + "_spectrum.jpg"}>Download Image</a>
        </Button>
      </div>
    );

    const updateLower = () => (event) => {
      setlowerfreq(event.target.value);
    }

    const updateUpper = () => (event) => {
      setupperfreq(event.target.value);
    }

    const uploadAudio = async () => {
      console.log("uploading to audio to backend.. waiting for response")
      setStatus("Loading");
      const formData = new FormData();
      formData.append('lowerbound', lowerfreq);
      formData.append('upperbound', upperfreq);
      formData.append('file' ,file);
      formData.append('fileName' , fileName);
      formData.append('timeDuration', timeDuration);

      const res = await axios.post('/api/TF-spectrum', formData , {
        headers: {'Content-Type': 'multipart/form-data; '},
      });
      setImage(`data:image/jpg;base64,${res.data.img}`);
      setImageWidth(res.data.width);
      setlowerfreqImg(parseInt(res.data.low));
      setupperfreqImg(parseInt(res.data.high));
      console.log("response received, update canvas")
      setStatus("Analyse");
    }

    //Change sample audio
    const sampleChange = () => (event) => {
      if(event.target.value == "Chord"){
          setAudio(sample_sound[0]);
          setFileName(sample_filename[0]);
          retrieveBlob(a, "Chord.wav");
      }
      else if(event.target.value == "handel"){
          setAudio(sample_sound[1]);
          setFileName(sample_filename[1]);
          retrieveBlob(b, "handel.wav");
      }
      else{
          setAudio(sample_sound[2]);
          setFileName(sample_filename[2]);
          retrieveBlob(c, "sample.wav");
      }
  }

    return (
      <>
      <div style={{position:"absolute", left:"21%", top:"24%", fontWeight:"bold", fontSize:"18px", fontFamily: "Comic Sans MS, Comic Sans, cursive", color:"#70d1d0", textShadow:"1px 1px white"}}>Hz</div>
      <div style={{position:"absolute", left:"20%", top:"28%", fontWeight:"bold", fontFamily: "Comic Sans MS, Comic Sans, cursive", color: "white"}}>{upperfreqImg}-</div>
      <div style={{position:"absolute", left:"20%", top:"44%", fontWeight:"bold", fontFamily: "Comic Sans MS, Comic Sans, cursive", color: "white"}}>{parseInt(lowerfreqImg+3*(upperfreqImg-lowerfreqImg)/4)}-</div>
      <div style={{position:"absolute", left:"20%", top:"59.5%", fontWeight:"bold", fontFamily: "Comic Sans MS, Comic Sans, cursive", color: "white"}}>{parseInt(lowerfreqImg+2*(upperfreqImg-lowerfreqImg)/4)}-</div>
      <div style={{position:"absolute", left:"20%", top:"75%", fontWeight:"bold", fontFamily: "Comic Sans MS, Comic Sans, cursive", color: "white"}}>{parseInt(lowerfreqImg+(upperfreqImg-lowerfreqImg)/4)}-</div>
      <div style={{position:"absolute", left:"20.5%", top:"90%", fontWeight:"bold", fontFamily: "Comic Sans MS, Comic Sans, cursive", color: "white"}}>{lowerfreqImg}-</div>
      <Wrapper>
        <Left style={{backgroundColor:"white"}}>
          <img src = {image} height="99%" width={imageWidth*2}></img>
        </Left>
        <Right style={{backgroundColor:"white"}}>
          <div className="temp1" style={{fontSize:"30px", fontWeight:"bolder", position:"relative", left:"5%", padding:"5px"}}>
            Upload Audio File
          </div>
          <select className="selbar"  onChange = {sampleChange()} style={{position:"relative", left:"8%", padding:"10px", margin:'5px'}}>
            <option value = "Chord" >Chord</option>
            <option value = "handel" >Handel</option>
            <option value = "sample" >Sample</option>
          </select>
          <audio id="audio" className="temp2" preload = "auto" src = {audio} controls 
              style={{position:"relative", left:"0%", top:"-10px"}}> </audio>
          
          <input className="temp3" type="file" id="input_aud" accept = ".wav," onChange={handleChange(setAudio)} 
            style={{position:"relative", left:"5%", top:"-25px"}}/>

          <div style={{position:"relative", left:"25px", top:"-25px", fontSize:"17px", fontStyle:"italic"}}>
          Supported audio file format: WAV
          </div>
          <div style={{position:"relative", left:"25px", top:"-5px", fontSize:"17px", fontWeight:"bold"}}>
            Frequency range selection (Hz):
          </div>
          
          <div className="slider_container1" style={{position:"absolute", left:"72%", top:"55.5%", fontSize:"15px"}}>
            Lower Bound
            <div className="slider1" style={{left:"15px", width:"115px"}}>
              <input type = "range" min="0" max="2000" onChange={updateLower()}/>
            </div>
            <div id="lower_slider_value" style={{position:"absolute", left:"180px",color:"white", top: "0px", fontWeight:"bolder", zIndex:"2", textShadow:"1px 1px black"}}>{lowerfreq}</div>
            <div style={{position:"absolute", left:"110px", top: "20px", fontWeight:"bolder"}}>0</div>
            <div style={{position:"absolute", left:"250px", top: "20px", fontWeight:"bolder"}}>2000</div>
          </div>
            <div className="slider_container2" style={{position:"absolute", left:"72%", top:"64.5%", fontSize:"15px"}}>
              Upper Bound
              <div className="slider2" style={{left:"15px", width:"115px"}}>
                <input type = "range" min="2000" max="8000" onChange={updateUpper()}/>
              </div>
              <div id="upper_slider_value" style={{position:"absolute", left:"180px",color:"white", top: "0px", fontWeight:"bolder", zIndex:"2", textShadow:"1px 1px black"}}>{upperfreq}</div>
              <div style={{position:"absolute", left:"110px", top: "20px", fontWeight:"bolder"}}>2000</div>
              <div style={{position:"absolute", left:"250px", top: "20px", fontWeight:"bolder"}}>8000</div>
          </div>
          <Button size = "large" className="temp4" variant="contained" color="success" disabled = {status === "Loading"}
            style={{ width: 160, height: 70, position:"relative", left:"25%", top:"100px"}} onClick={uploadAudio}>
            {status}
          </Button>
          {DoneImage}
        </Right>

      </Wrapper>
      </>
    )
}