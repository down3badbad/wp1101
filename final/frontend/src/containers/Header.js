import * as React from 'react';
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

const Wrapper = styled.div`
  text-align: center;
`;

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Wrapper>
    <Box sx={{ flexGrow: 1, backgroundColor: 'black' }}>
      <AppBar position="sticky" style={{backgroundColor: "green"}}>
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
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Audio speed adjustment</MenuItem>
                <MenuItem onClick={handleClose}>Spectrum Analyzer</MenuItem>
                <MenuItem onClick={handleClose}>Noise Reduction</MenuItem>
                <MenuItem onClick={handleClose}>Sound Enhancement</MenuItem>
          </Menu>
          <Typography  variant="h5" component="div" sx={{ flexGrow: 1 }}>
            AUDIO SPECTRUM ANALYZER
          </Typography>
          <Button color="inherit">ADMIN</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </Wrapper>
  );
}

export default Header;