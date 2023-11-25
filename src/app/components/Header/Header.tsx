"use client";

import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { AppDispatch, RootState } from '@/redux/store';
import { connect } from 'react-redux';
import { logout } from '@/redux/actions/authActions';
import { useRouter } from 'next/navigation';
import cookie from 'js-cookie';

interface HeaderProps {
    isAuthenticated: boolean;
    token: string | null;
    logout: (token: string) => void;
}

const Header: React.FC<HeaderProps> = props => {
  let { isAuthenticated, token, logout } = props;
  const router = useRouter();
  const [logoutButtonWasClicked, setLogoutButtonWasClicked] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const initiateLogout = () => {
    setLogoutButtonWasClicked(true);
    handleClose();
    if(isAuthenticated && token) logout(token);
  }

  useEffect(() => {
    if(token === null && !isAuthenticated && logoutButtonWasClicked) {
        cookie.set("successMsg", "Logged out successfully!");
        router.push("/login");
    }
  }, [token, isAuthenticated]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PROMPTS MANAGER
          </Typography>
          {isAuthenticated && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
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
                <MenuItem onClick={initiateLogout}>Log Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const mapStateToProps = (state: RootState) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token,
    };
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        logout: (token: string) => dispatch(logout(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);