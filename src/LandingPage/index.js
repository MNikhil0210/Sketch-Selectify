import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomCard from '../CustomCard';
import { Typography } from '@material-ui/core';
import Branches from '../Branches';

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
        height: '450px'
    },
    zemTechnology: {
        marginTop: '180px',
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
        color: 'rgb(51,71,91)',
        lineHeight: '45.76px',
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
        marginRight: '22%',
        marginLeft: '22%',
        marginTop: '60px',
        marginBottom: '60px'
    },
    footerLine: {
        height: '2px',
        width: 'auto',
        background: '#dfe3eb',
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
    info: {
        fontSize: '14px',
        color: 'rgb(51,71,91)',
        lineHeight: '20.02px',
        fontWeight: 400,
        textAlign: 'center',
        letterSpacing: '0.14994px',
    },
    componentLibText: {
        fontSize: '24px',
        fontWeight: 400,
        marginBottom: '20px',
        color: 'rgb(51,71,91)',
        lineHeight: '34.32px',
        textAlign: 'center',
        letterSpacing: '0.14994px',
    },
}));

export default function LandingPage(props) {

    const classes = useStyles();
    const [page, setPage] = React.useState("MAIN");
    const [pId, setPid] = React.useState();
    const [projs, setProjs] = React.useState([]);
    const [showList, setShowList] = React.useState([])
    const [searchTerm, setSearchTerm] = React.useState("")

    React.useEffect(() => {
        const getProjects = async () => {
            const Abstract = require('abstract-sdk');
            const client = new Abstract.Client({
                accessToken: 'bb75ec9c833a43d50607d1b10ed72ae04cae4180e6eb803f228314a26a84545a'
            });

            const listProjs = await client.projects.list();
            setProjs(listProjs);
            setShowList(listProjs)
        }
        getProjects();
    }, []);

    React.useEffect(() => {
        setShowList(projs.filter(x => x.name.toLowerCase().includes(props.searchTerm.toLowerCase())))
    }, [props.searchTerm,projs]);

    if (page === "BRANCH") {
        return (
            <div>
                <Branches showList={projs} projId={pId} searchTerm={props.searchTerm}/>
            </div>
        );
    }
    else
        return (
            <div style={{ background: '#fafafa' }}>
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
                    <div className={classes.info}>
                        <div>HubSpot Canvas is the design system that we at HubSpot use to build our products. This library showcases the building blocks that make up our design system, from colors and typography to React-based components and data visualization tools. What you see here is a subset of our components and styles, pulled straight from our production code.</div>
                        <br />
                        <div>This library is a window into how we build our products here at HubSpot and what it’s like to build the HubSpot product. We’re sharing it because we’re proud of the time and effort we’ve put into creating our design system and optimizing it for developers and designers so that we can keep it evergreen.</div>
                        <br />
                        <div>If you’re an engineer or designer and you’re excited by what you see here, get in touch.</div>
                    </div>
                </div>
                <div className={classes.body}>
                    <div className={classes.componentLibText}>Explore Zorro Component Library:</div>
                </div>

                <CustomCard projects={showList} respond={(x) => { setPid(x); setPage("BRANCH") }} />


                <div className={classes.footer}>
                    <div className={classes.footerLine}></div>
                    <div className={classes.copyright}>Copyright © 2018 – 2020 Zemoso Technologies Pvt Lmt, Inc.</div>
                </div>                
            </div>
        );
}