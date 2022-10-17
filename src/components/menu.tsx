import React, { useContext, useState, useEffect } from 'react';
import List from '@mui/material/List';
import { Link } from 'react-router-dom';

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

enum MenuType {
  ACCOUNT,
  CONTRACTS,
}

export const Menu = () => {
  const [open, setOpen] = useState<MenuType | null>(null);
  const accounts = useSelector((state: Web3StoreState) => {
    return state.web3.accounts;
  });
  const handleClick = (type: MenuType) => {
    open === type ? setOpen(null) : setOpen(type);
  };

  return (
    <List sx={{ width: '20%', bgcolor: 'background.paper' }} component="nav" aria-labelledby="nested-list-subheader">
      <ListItemButton onClick={() => handleClick(MenuType.ACCOUNT)}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Accounts" />
        {open !== MenuType.ACCOUNT ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open === MenuType.ACCOUNT} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {accounts.map((account) => (
            <Link key={account} to={`account/${account}`}>
              <ListItemButton key={account} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText
                  primary={account}
                  primaryTypographyProps={{
                    color: 'primary',
                    overflow: 'hidden !important',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis !important',
                  }}
                />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick(MenuType.CONTRACTS)}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Contracts" />
        {open !== MenuType.CONTRACTS ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open === MenuType.CONTRACTS}>
        <List component="div">
            <Link to={`contract/deploy-contract`}>
          <ListItemButton>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ color: 'primary' }}>Deploy Contract</ListItemText>
          </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </List>
  );
};
