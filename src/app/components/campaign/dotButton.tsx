import React, { useState, MouseEvent } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface DotButtonProps {
  onButtonClick: () => void;
}

const DotButton: React.FC<DotButtonProps> = ({ onButtonClick }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleFilterClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleButtonClick = () => {
    onButtonClick();
  };

  return (
    <div>
      <IconButton aria-controls="filter-menu" aria-haspopup="true" onClick={handleFilterClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handleButtonClick();
          }}
        >
          Clear all filters
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DotButton;
