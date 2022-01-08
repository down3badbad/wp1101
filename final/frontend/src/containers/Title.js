import { useState, useEffect } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from 'styled-components';

const Wrapper = styled.div`
margin: auto;
width: 50%;
postion: relative;
height: 20vh;
display: flex;
flex-direction: column;
justify-content: center;
`;

const title_arr = ["What is Time-Frequency spectrum analysis?", "", "", ""]
const title_description = [".............", "", "", ""]


export default function Title() {
  const [currFunc, setcurrFunc] = useState("");

  return (
    <Wrapper>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography variant = "h5" component = "h5" align = "center">{title_arr[0]}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {title_description[0]}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Wrapper>
  );
}
