import { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import styled from 'styled-components';
import { useBody } from '../hooks/useBody';
import { useAuth } from '../hooks/useAuth';

const Wrapper = styled.div`
  text-align: center;
`;

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { currFunc, setFunc, setNo } = useBody();
  const { username, setLogin } = useAuth();

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleChange = (event) => {
    setAnchorEl(null);
    setFunc(event.currentTarget.id);
    event.currentTarget.id === "TF-spectrum" ? setNo(0) : (event.currentTarget.id === "adjust-speed" ? setNo(1) : setNo(2));
  };

  const changeLogout = () => (event) => {
    setLogin(false);
  }

  return (
    <Wrapper>
    <Box sx={{ flexGrow: 1, backgroundColor: 'black' }}>
      <AppBar position="sticky" style={{backgroundColor: "#202020"}}>
        <Toolbar>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography  variant="h6" component="div">
            MENU
          </Typography>
          <Menu
                value = {currFunc}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleChange}
              >
                <MenuItem id = "TF-spectrum" onClick={handleChange}>Spectrum Analyzer</MenuItem>
                <MenuItem id = "adjust-speed" onClick={handleChange}>Audio speed adjustment</MenuItem>
                <MenuItem id = "reduction/enhancement" onClick={handleChange}>Noise Reduction/Sound Enhancement</MenuItem>
          </Menu>
          <Typography  style = {{fontWeight: "bold"}}variant="h5" component="div" sx={{ flexGrow: 1 }}>
            AUDIO SPECTRUM ANALYSIS TOOLKIT
          </Typography>
          <Button color="inherit" onClick={changeLogout()}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </Wrapper>
  );
}

export default Header;