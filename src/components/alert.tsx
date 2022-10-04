import React, { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Menu } from './menu';
import './App.css';
import { TooBar } from './toolBar';

type AlertProps = {
  title: string;
  message: string;
};

export const Alert = (props: AlertProps) => {
  const [open, setOpen] = useState(true);
  const { title, message } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TooBar />
      <Menu />
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
