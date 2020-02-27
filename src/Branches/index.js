import React , {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomDrawer from '../CustomDrawer';


const useStyles = makeStyles(theme => ({
    branch: {
        marginLeft: '25%'
    },
}));

export default function Branches(props){
    const classes = useStyles();
    const [branches, setBranches] = useState([]);
    const [pid,setPid] = useState(props.projId)

    useEffect(()=>{
        const getBranches = async()=>{
            const Abstract = require('abstract-sdk');
            const client = new Abstract.Client({
                accessToken: '000b7eea07546f4f3630530465da4b28de34df221f4839e7084a13a77cd875f1'
            });

            const listBranch = await client.branches.list({
                projectId: pid,
            });
            setBranches(listBranch);
        }
        getBranches();
    },[pid]);

    return (
        <div className={classes.branch}>
            <CustomDrawer projects={props.showList} onChangeProjId={setPid}/>
            {branches?branches.map(item=>(
                <div key={item.id}>{item.name}</div>
            )):<div>Nothing much here</div>}
        </div>
    );

}