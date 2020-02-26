import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import tool1 from '../resources/brush.svg';
import tool2 from '../resources/dove.svg';
import tool3 from '../resources/pencil.svg';

const images = [tool1, tool2, tool3];

const useStyles = makeStyles(theme => ({
    cardHolder: {
        marginRight: '22%',
        marginLeft: '22%',
        alignItems: 'center',
        justifyContent: 'center',
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
        maxWidth: '100%',
        flexWrap: "wrap",
        textAlign: "center"
    },
    card: {
        height: 200,
        width: 200,
        marginLeft: '3%',
        marginBottom: '3%',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 0 1px #7fd1de',
        '&:hover': {
            boxShadow: '0 0 0 3px #7fd1de, 0 0 12px 0 rgba(0,163,189,.3)',
            transitionDuration:  '500ms'
        }
    },
    img: {
        marginTop: '10%',
        width: '80px',
        height: '80px',
    },
}));

function randPic(){
    return images[Math.floor(Math.random() * images.length)];
}

export default function CustomCard(){

    const [projs, setProjs] = useState([]);

    useEffect(()=>{
        const getAssets = async () =>{
            const Abstract = require('abstract-sdk');
            const client = new Abstract.Client({
                accessToken: '000b7eea07546f4f3630530465da4b28de34df221f4839e7084a13a77cd875f1'
            });

            const listProjs = await client.projects.list();
            setProjs(listProjs);
        }
        getAssets();
    },[]);

    const classes = useStyles();

    return(
        <div className={classes.cardHolder}>
            {projs.map(item=>(
                <div className={classes.card} key={item.id}>
                    <img className={classes.img} src={tool1} alt="Random Pic"/>
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    );
}