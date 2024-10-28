import React from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar className="!bg-custom-gradient flex justify-between">
                <div className="my-5 text-start font-poppins text-3xl text-white">
                    MedEase
                </div>
                <div>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleMenuClick}
                    >
                        <AccountCircleIcon fontSize={'large'} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        className='bg-white-500'
                        TransitionProps={{
                            onExited: handleMenuClose,
                        }}
                    >
                        <MenuItem
                            key={'logout'}
                            onClick={() => {
                                localStorage.clear();
                                window.location.reload();
                            }}
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
