import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import { Toolbar, Typography, InputBase, Tabs, Tab, Box } from '@material-ui/core';
import zemIcon from '../resources/zemoso.svg';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

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
        fontSize: 18,
        fontWeight: 500,
        marginRight: '8%',
        marginLeft: '8%'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'inherit',
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
        color: 'rgb(0, 145, 174)'
      },
      inputRoot: {
        color: '#7c98b6',
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function CustomAppBar() {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return (
        <AppBar position="static" className={classes.appbar}>
            <Toolbar className={classes.tool}>
                <img src={zemIcon} alt="Zemoso" />
                <Typography variant="h6" className={classes.title}>
                    Sketch-Selectify
                </Typography>
                <Tabs style={{flexGrow: 1}} value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab style={{color: 'rgb(51, 71, 91)'}} label="Projects" {...a11yProps(0)} />
                    <Tab style={{color: 'rgb(51, 71, 91)'}} label="Components" {...a11yProps(1)} />
                </Tabs>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search library"
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