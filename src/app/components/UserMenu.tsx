import { SetStateAction, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { FaBars } from 'react-icons/fa'; // Import the LinkedIn icon

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Specify the type for anchorEl

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="menu"
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                <FaBars size={20} />
            </IconButton>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>About</MenuItem>
                <MenuItem onClick={handleClose}>Contact Us</MenuItem>
            </Menu>
        </div>
    );
};

export default UserMenu;
