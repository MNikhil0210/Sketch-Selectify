import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Link } from '@material-ui/core';
import CustomDrawer from '../CustomDrawer';
import Config from '../Config';

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
    imageDistance: {
        marginTop: '5%'
    },
    componentText: {
        textAlign: 'left',
        color: 'rgb(51,71,91)',
        fontWeight: 400
    },
}));

export default function Branches(props) {

    const classes = useStyles();
    const pId = props.projId;
    const [branches, setBranches] = useState([]);
    const [files, setFiles] = useState([]);
    const [layers, setLayers] = useState([]);
    const [temp, setTemp] = useState([]);
    const [assets, setAssets] = useState([]);
    const [pics, setPics] = useState([]);
    const [componentUrls, setComponentUrls] = useState([]);
    const myMap = [];
    var binaryList = [];
    const [binaryString, setBinaryString] = useState([]);
    const token = Config.AccessToken.map(x=>x.accessToken);
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        console.log(value);
        setPage(value);
    };

    async function filterAssets(helper) {
        const Abstract = require('abstract-sdk');
        const client = new Abstract.Client({
            accessToken: token[0]
        });
        setTemp(layers.filter(item => item.name.includes(helper)));
        var listUrls = [];
        for (var i = 0; i < layers.filter(item => item.name.includes(helper)).length; i++) {
            const layer = layers.filter(item => item.name.includes(helper))[i]
            await client.previews.raw({
                projectId: pId,
                branchId: "master",
                fileId: layer.fileId,
                layerId: layer.id,
                sha: "latest"
            }).then(
                imageBuffer => {
                    var arrayBufferView = new Uint8Array(imageBuffer);
                    var binary = '';
                    var bytes = arrayBufferView
                    var len = bytes.byteLength;
                    for (var i = 0; i < len; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    binary = btoa(binary);
                    binaryList.push(binary);
                    myMap[layer.id] = `data:image/png;base64,${binary}`;
                    console.log(binary);
                }
            )
            const urls = await client.previews.info({
                projectId: pId,
                branchId: "master",
                fileId: layer.fileId,
                layerId: layer.id,
                sha: "latest"
            });
            var tempUrl = urls.webUrl;
            const len = tempUrl.indexOf("commits");
            const commit = tempUrl.substring(0, tempUrl.indexOf("commits"));
            listUrls.push(commit + "branches/" + "master" + "/" + tempUrl.substring(len, tempUrl.length));
        }
        //}
        setComponentUrls(listUrls);
        setBinaryString(binaryList);
        setPics(myMap);
    }

    useEffect(() => {
        const abortController = new AbortController();
        generateComponents();
        return function cleanup() {
            abortController.abort();
        }
    }, [generateComponents]);

    async function generateComponents() {

        const Abstract = require('abstract-sdk');
        const client = new Abstract.Client({
            accessToken: token[0]
        });

        const listBranches = await client.branches.list({
            projectId: pId
        });
        setBranches(listBranches);

        const listFiles = await client.files.list({
            projectId: pId,
            branchId: listBranches[0].id
        });
        setFiles(listFiles);

        const listLayers = await client.layers.list({
            projectId: pId,
            branchId: listBranches[0].id,
            fileId: listFiles[0].id
        });
        setLayers(listLayers);

        const mySet = new Set([]);
        listLayers.forEach(layer => {
            layer.name = layer.name.replace("/", "?");
            const startIndex = layer.name.indexOf("?");
            if (layer.name.indexOf("/") !== -1) {
                mySet.add(layer.name.substring(startIndex + 1, layer.name.indexOf("/")));
            }
            else {
                layer.name = layer.name.replace("?", "/");
                mySet.add(layer.name.substring(0, layer.name.indexOf("/")));
            }
        })
        setAssets(mySet);
    }
   function TODO()
   {
       return new Set(Array.from(assets).filter(x=>x.toLowerCase().includes(props.searchTerm.toLowerCase())));
   }

   function con(){
       console.log(componentUrls);
   }

    return (
        <div className={classes.branch}>
            <CustomDrawer assets={
                TODO()
            } searchTerm={props.searchTerm} filterAssets={(x) => filterAssets(x)} />
            <Toolbar />
            <div className={classes.components}>
                {temp.length ?
                    temp.map((item, index) => (
                        <div key={item.id}>
                            <div className={classes.imageDistance}>
                                <h3>{item.name.substring(item.name.lastIndexOf("/") + 1)}</h3>
                                <img className={classes.image} id={item.id} src={pics[item.id]} alt="I'm working on it. Please be patient!" />
                            </div>
                            <button onClick={con}>Here</button>
                            <div><Link key={componentUrls[index]} href={componentUrls[index]}>
                                Like me? Click here.
                            </Link></div>
                        </div>
                    )) :
                    <div className={classes.componentText}>
                        <h2>What is a component?</h2>
                        <div style={{ marginBottom: '8%' }}>A UI element that can be used more than twice in the same way and can be broken down to its basics. It can have variants or variations (i.e. pagination with or without next arrows). It doesn’t usually have an opinion on content or task. For opinionated uses of components, see patterns.</div>
                        <h2>Are these all of the components?</h2>
                        <div style={{ marginBottom: '8%' }}>Nope. While just a fraction of the total system, we think it’s representative of the whole and a good introduction without losing the forest for the trees.</div>
                        <h2>Will these components change?</h2>
                        <div style={{ marginBottom: '8%' }}>Yup. These components are managed by a rotating group of designers and a dedicated team of front-end engineers working in partnership. This means that what designers create and what the engineers build is always up-to-date. Because designers pull from the same Sketch UI kit and because engineers pull from the same codebase, when these teams adjust or add components, those components are updated for everyone.</div>
                    </div>}
            </div>
        </div>
    );

}

//nikhil -- 394ac22ced246c2ce944adc6a44ecf03cbcce5d3481c79b09a58b6db97512fab

//sowmya -- bb75ec9c833a43d50607d1b10ed72ae04cae4180e6eb803f228314a26a84545a