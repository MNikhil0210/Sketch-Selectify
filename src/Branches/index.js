import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomDrawer from '../CustomDrawer';
import { Toolbar } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    branch: {
        marginLeft: '25%'
    },
    components: {
        textAlign: 'center',
    },
    image: {
        minHeight: '80px',
        minWidth: '80px',
        maxWidth: '1000px'
    },
}));

export default function Branches(props) {
    const classes = useStyles();
    const [branches, setBranches] = useState([]);
    const [file, setFile] = useState([]);
    const [layer, setLayer] = useState([]);
    const [pid, setPid] = useState(props.projId);
    const [temp, setTemp] = useState([]);
    const [assets, setAssets] = useState(new Set([]));

    function filterAssets(helper) {
        setTemp(layer.filter(item => item.name.includes(helper)));
    }

    useEffect(() => {
        const getBranches = async () => {
            const Abstract = require('abstract-sdk');
            const client = new Abstract.Client({
                accessToken: 'bb75ec9c833a43d50607d1b10ed72ae04cae4180e6eb803f228314a26a84545a'
            });

            const listBranch = await client.branches.list({
                projectId: pid,
            });
            setBranches(listBranch);

            const lsFile = await client.files.list({
                projectId: pid,
                branchId: listBranch[0].id,
                sha: 'latest'
            });
            setFile(lsFile);

            //list all layers in a file
            const lsLayer = await client.layers.list({
                projectId: pid,
                branchId: listBranch[0].id,
                fileId: lsFile[0].id,
                sha: 'latest'
            });
            setLayer(lsLayer);
            const mySet = new Set([]);
            lsLayer.forEach(layer => mySet.add(layer.name.substring(0, layer.name.indexOf("/"))))
            setAssets(mySet)

            const imageBuffer = await client.previews.raw({
                projectId: pid,
                branchId: listBranch[0].id,
                fileId: lsFile[0].id,
                layerId: "AC66241C-EE47-4585-BCA3-25D0D0B33844",
                sha: "latest"
            });

            var arrayBufferView = new Uint8Array(imageBuffer);
            var base64String = btoa(String.fromCharCode.apply(null, arrayBufferView));
            document.getElementById('refef').src = `data:image/png;base64,${base64String}`;
        }
        getBranches();
    }, [pid]);

    return (
        <div className={classes.branch}>
            <CustomDrawer projects={props.showList} onChangeProjId={setPid} assets={assets} filterAssets={(x) => filterAssets(x)} />
            <Toolbar />
            <div className={classes.components}>
                <img className={classes.image} id="refef" alt="Component"/>
                {temp.map(item => (
                    <div key={item.id}>{item.name} ------ {item.id}</div>
                ))}
            </div>
        </div>
    );

}