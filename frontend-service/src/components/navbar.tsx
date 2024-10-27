import React from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();
    const handleOptionSelect = (option: string) => {
        switch (option.toLowerCase()) {
            case 'calender':
                navigate('/main');
                break;
            case 'settings':
                navigate('/settings');
                break;
            case 'logout':
                localStorage.clear();
                window.location.reload();
                break;
            default:
                break;
        }
        handleMenuClose();
    };

    return (
        <AppBar position="static">
            <Toolbar className="!bg-custom-gradient flex justify-between">
                <div className="px-16 my-5 text-start font-poppins text-3xl text-white">
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
                        {(
                            localStorage.getItem('type') === 'hospital' ?
                            [ 'Logout' ] :
                            [ 'Calender', 'Settings', 'Logout' ]
                        ).map((option) => (
                                <MenuItem
                                    key={option}
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    {option}
                                </MenuItem>
                            ))}
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
