import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomAppBar from '../CustomAppBar';
import CustomCard from '../CustomCard';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    midColor: {
        background: 'rgb(45, 62, 80)',
        maxWidth: '100vw',
        marginBottom: '48px',
        paddingRight: '22%',
        paddingLeft: '22%',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: '380px'
    },
    zemTechnology: {
        marginTop: '90px',
        color: '#fff',
        verticalAlign: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '42px',
        fontWeight: 500,
    },
    componentLib: {
        color: '#fff',
        fontSize: '18px',
        marginBottom: '90px',
        fontWeight: 500,
        verticalAlign: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyFont: {
        fontSize: '32px',
        fontWeight: 700,
        marginBottom: '20px'
    },
    midText: {
        display: 'flex',
        flexDirection: 'column',
        verticalAlign: 'center'
    },
    body: {
        paddingRight: '22%',
        paddingLeft: '22%',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fafafa',
        marginBottom: '48px'
    },
    footer: {
        height: '2px',
        width: 'auto',
        background: '#dfe3eb',
        marginRight: '22%',
        marginLeft: '22%',
        marginTop: '60px',
        marginBottom: '60px'
    },
    copyright: {
        color: 'rgb(81, 111, 144)',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2%',
        fontSize: '12px',
        fontWeight: 400
    },
}));

export default function LandingPage() {

    const classes = useStyles();

    return (
        <div style={{background: '#fafafa', marginBottom: '5%'}}>
            <CustomAppBar />
            <div className={classes.midColor}>
                <div className={classes.midText}>
                    <Typography className={classes.zemTechnology}>
                        ZeMoSo Technologies
                    </Typography>
                    <Typography className={classes.componentLib}>
                        Component Library
                    </Typography>
                </div>
            </div>
            <div className={classes.body}>
                <div className={classes.bodyFont}>Welcome to Component Library</div>
                <div>HubSpot Canvas is the design system that we at HubSpot use to build our products. This library showcases the building blocks that make up our design system, from colors and typography to React-based components and data visualization tools. What you see here is a subset of our components and styles, pulled straight from our production code.</div>
                <br/>
                <div>This library is a window into how we build our products here at HubSpot and what it’s like to build the HubSpot product. We’re sharing it because we’re proud of the time and effort we’ve put into creating our design system and optimizing it for developers and designers so that we can keep it evergreen.</div>
                <br/>
                <div>If you’re an engineer or designer and you’re excited by what you see here, get in touch.</div>
            </div>
            <div className={classes.body}>
                <div style={{fontSize: '24px', fontWeight: 400, marginBottom: '20px'}}>Explore Zorro Component Library:</div>
                <CustomCard />
            </div>
            <div className={classes.footer}></div>
            <div className={classes.copyright}>Copyright © 2018 – 2020 Zemoso Technologies Pvt Lmt, Inc.</div>
        </div>
    );
}