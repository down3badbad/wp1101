import { useState, useEffect } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from 'styled-components';
import { useBody } from '../hooks/useBody';

const Wrapper = styled.div`
margin: auto;
width: 50%;
postion: relative;
height: 20vh;
display: flex;
flex-direction: column;
justify-content: center;
`;

const title_arr = ["What is Time-Frequency spectrum analysis?", "What is Speed Adjustment?", "What is Noise Reduction/Sound Enhancement?"]
const title_description = ["In signal processing, time frequency analysis comprises those techniques that study a signal in both the time and frequency domains simultaneously, using various time–frequency representations. Rather than viewing a 1-dimensional signal (a function, real or complex-valued, whose domain is the real line) and some transform (another function whose domain is the real line, obtained from the original via some transform), time–frequency analysis studies a two-dimensional signal – a function whose domain is the two-dimensional real plane, obtained from the signal via a time–frequency transform. 簡單來說，就是能夠得到資料的瞬時頻率(Instantaneous phase and frequency)，這是一般使用Fourier transform所做不到的。", 
                            "Speed Adjustment(time stretching) is the process of changing the speed or duration of an audio signal without affecting its pitch or introducing distortion.",
                             "Noise reduction is the process of removing noise from a signal. This can be achieved by the convolution of an even gaussian filter with the signal. Vice versa for sound enhancement, the filter used is an odd gaussian filter."]


export default function Title() {
  const { currNo } = useBody();

  return (
    <Wrapper>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography variant = "h5" component = "h5" align = "center">{title_arr[currNo]}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {title_description[currNo]}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Wrapper>
  );
}
