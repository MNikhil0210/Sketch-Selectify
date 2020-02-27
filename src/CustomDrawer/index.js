import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import {
  Button, Divider,
} from "@material-ui/core";

const drawerWidth = "20%";

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  heading: {
    fontSize: '32px',
    marginTop: '30px',
    alignItems: 'center',
    fontWeight: 800,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
      alignItems: 'center',
      fontSize: '14px',
      fontWeight: 500,
      justifyContent: 'center',
      textAlign: 'center',
      lineHeight: '24.5px',
      display: 'flex'
  },
  projects: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: '23.42px',
      letterSpacing: '0.14994px',
  },
  holder: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      textAlign: 'center'
  },
  toolbar: theme.mixins.toolbar
}));

export default function CustomDrawer(props) {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      color="inherit"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <div className={classes.holder}>
          <div className={classes.heading}>Sketch-Selectify</div>
          <h3 className={classes.project}>Projects</h3>
            {props.projects.map(item=>(
                <div className={classes.button} key={item.id}>
                    <Button onClick={()=>props.onChangeProjId(item.id)}>{item.name}</Button>
                    <Divider style={{height: '1px', background: 'rgba(0, 0, 0, 0.12)'}}/>
                </div>
            ))}
        </div>
    </Drawer>
  );
}