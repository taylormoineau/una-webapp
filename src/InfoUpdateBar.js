import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MuiAlert from '@material-ui/lab/Alert';
import {useHistory} from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';

export const InfoUpdateBar = ({name}) => {
  let history = useHistory();

  const [open, setOpen] = React.useState(true);

  const handleUpdate = () => {
    setOpen(false);
    history.push('/infoRegister');
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Collapse in={open}>
        <MuiAlert
          className="alert"
          open={open}
          autoHideDuration={8000}
          onClose={handleClose}
          variant="filled"
          severity="warning"
        >
          {`Welcome, ${name}! Please fill out some basic info before you start!   `}{' '}
          <React.Fragment>
            <Button variant="contained" size="small" onClick={handleUpdate}>
              UPDATE
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            ></IconButton>
          </React.Fragment>
        </MuiAlert>
      </Collapse>
    </div>
  );
};
