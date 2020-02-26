import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import { Toolbar, Typography, InputBase } from '@material-ui/core';
import zemIcon from '../resources/zemoso.svg';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    appbar: {
        background: "rgb(245, 248, 250)",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        color: '#33475b',
        marginLeft: '16px',
        flexGrow: 1,
    },
    tool: {
        marginRight: '8%',
        marginLeft: '8%'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: 120,
          '&:focus': {
            width: 200,
          },
        },
      },
}));

export default function LandingPage() {

    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.appbar}>
            <Toolbar className={classes.tool}>
                <img src={zemIcon} alt="Zemoso" />
                <Typography variant="h6" className={classes.title}>
                    Sketch-Selectify
                </Typography>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
            </Toolbar>
        </AppBar>
    );
}