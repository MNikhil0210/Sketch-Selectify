import React from 'react';
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
        marginLeft: '15px',
        marginBottom: '15px',
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
    cardName: {
        color: 'rgb(51,71,91)',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '24px',
        letterSpacing: '0.14994px'
    },
}));

const randPic = () =>{
    var rand = Math.floor(Math.random() * images.length)+1;
    if(rand === 1)
        return tool1;
    if(rand === 2)
        return tool2;
    if(rand === 3)
        return tool3;
    
}

export default function CustomCard(props){

    const classes = useStyles();

    return(
        <div className={classes.cardHolder}>
            {props.projects.map(item=>(
                <div className={classes.card} key={item.id} onClick={()=>props.respond(item.id)}>
                    <img className={classes.img} src={randPic()} alt="Random Pic"/>
                    <p className={classes.cardName}>{item.name}</p>
                </div>
            ))}
        </div>
    );
}