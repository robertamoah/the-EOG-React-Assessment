import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
// import Weather from '../Features/Weather/Weather';
import Selector from "./navBarSelector"

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  
});

export default () => {
  const classes = useStyles();

  const name = "Robert Pittman's";
  return (
    <AppBar position="static">
      <Toolbar style={{ background: "white" , color: "black"}}>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          <h1>
            {name}
          </h1>
        </Typography>
        <Selector />
        {/* <Weather /> */}
      </Toolbar>
    </AppBar>
  );
};
