import { Button } from '@mui/material';
import styled from 'styled-components';
import img from './title1.jpg';
import './img-wrapper.css';
import aud from './handel.wav'
import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import axios from '../api';

const Wrapper = styled.section`
  margin: auto;
  width: 80%;
  height: 65vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Left = styled.div`
  float:left;
  height:100%;
  width: 75%;
  border-style: groove;
`;

const Right = styled.div`
  height:100%;
  width: 25%;
  border-style: ridge;
`;


export default function Body() {
    const [image, setImage] = useState(img);
    const [audio, setAudio] = useState(aud);
    const [status, setStatus] = useState("Analyse");

    //Send audio file back to server
    const [file,setFile] = useState();
    const [fileName,setFileName] = useState("");
  
    const handleChange = (func) => (event) => {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
      if(event.target.files[0] !== null){
        const urlObj = URL.createObjectURL(event.target.files[0]);
        func(urlObj);
      }
    };

    const uploadAudio = async () => {
      console.log("uploading to audio to backend.. waiting for response")
      const formData = new FormData();  
      formData.append('file' ,file);
      formData.append('fileName' , fileName);

      const res = await axios.post('/api/TF-spectrum', formData , {
        headers: {'Content-Type': 'multipart/form-data; '},
      });
      setImage(`data:image/jpg;base64,${res.data.img}`);
      console.log("response received, update canvas")
    }

    return (
      <Wrapper>
        <Left>
          <img src = {image} height="100%" width="100%"></img>
        </Left>
        <Right>
          <div className="temp1">
            <h2>Upload Audio File</h2>
          </div>
          <select className="selbar">
            <option value = "chord">Chord</option>
            <option value = "handel">Handel</option>
            <option value = "sample">Sample</option>
          </select>
          <audio className="temp2" preload = "auto" src = {audio} controls></audio>
          
          {/* <form enctype="multipart/form-data" action="/upload" method="post"> */}
          <input className="temp3" type="file" id="input_aud" accept = ".mp3,.wav,.jpg" onChange={handleChange(setAudio)} />
          {/* </form> */}

          <Typography variant = "p" component = "p" align = "center">Supported audio file format: MP3, WAV</Typography>

          <Button size = "large" className="temp4" variant="contained" color="success" onClick={uploadAudio}>
            {status}
          </Button>
        </Right>

      </Wrapper>
    )
}