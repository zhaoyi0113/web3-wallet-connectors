import React, { useContext, useState, useEffect } from 'react';
import List from '@mui/material/List';

import { useSelector } from 'react-redux';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Web3StoreState } from '../features';

export const Menu = () => {
  const [open, setOpen] = useState(true);
  const accounts = useSelector((state: Web3StoreState) => {
    return state.web3.accounts;
  });
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List sx={{ width: '20%', bgcolor: 'background.paper' }} component="nav" aria-labelledby="nested-list-subheader">
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Accounts" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {accounts.map((account) => (
            <ListItemButton key={account} sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={account} primaryTypographyProps={{overflow: 'hidden !important', whiteSpace: 'nowrap', textOverflow: 'ellipsis !important'}} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
};
