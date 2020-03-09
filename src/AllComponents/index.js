import React, { useEffect, useState } from 'react';
import { Toolbar } from '@material-ui/core';
import CustomDrawer from '../CustomDrawer';
import { makeStyles } from '@material-ui/core/styles';

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

export default function AllComponents() {

    const classes = useStyles();
    var [projects, setProjects] = useState([]);
    var [branches, setBranches] = useState([]);
    var [files, setFiles] = useState([]);
    var [layers, listLayers] = useState([]);
    var [tempLayer, setTempLayer] = useState([]);
    const [commits, setCommits] = useState([]);
    const [assets, setAssets] = useState([]);
    const [load, setLoad] = useState(true);
    const [pics, setPics] = useState([]);
    const [componentUrls, setComponentUrls] = useState([]);
    const myMap = [];
    const [temp, setTemp] = useState([]);
    var binaryList = [];
    const [binaryString, setBinaryString] = useState([]);

    async function filterAssets(helper) {
        console.log(layers);
        var lid;
        const Abstract = require('abstract-sdk');
        const client = new Abstract.Client({
            accessToken: 'bb75ec9c833a43d50607d1b10ed72ae04cae4180e6eb803f228314a26a84545a'
        });
        console.log(layers.length);
        for (var i = 0; i < layers.length; i++) {
            setTemp(layers[i].filter(item => item.name.includes(helper)));
            lid = layers[i];

            var listUrls = [];
            //for (var br = 0; br < branches.length; br++) {
                for (var i = 0; i < lid.filter(item => item.name.includes(helper)).length; i++) {
                    const layer = lid.filter(item => item.name.includes(helper))[i]
                    await client.previews.raw({
                        projectId: layer.projectId,
                        branchId: "master",
                        fileId: layer.fileId,
                        layerId: layer.id,
                        sha: layer.sha
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
                        projectId: layer.projectId,
                        branchId: "master",
                        fileId: layer.fileId,
                        layerId: layer.id,
                        sha: layer.sha
                    });
                    var tempUrl = urls.webUrl;
                    const len = tempUrl.indexOf("commits");
                    const commit = tempUrl.substring(0, tempUrl.indexOf("commits"));
                    listUrls.push(commit + "branches/"+"master"+"/" + tempUrl.substring(len, tempUrl.length));

                }
            //}
        }

        setComponentUrls(listUrls);
        setBinaryString(binaryList);
        setPics(myMap);
    }

    useEffect(() => {
        const abortController = new AbortController();
        const getAllComponents = async () => {
            const mySet = new Set([]);
            const Abstract = require('abstract-sdk');
            const client = new Abstract.Client({
                accessToken: 'bb75ec9c833a43d50607d1b10ed72ae04cae4180e6eb803f228314a26a84545a'
            });

            const listProjects = await client.projects.list();
            projects.push(listProjects);

            for (var proj = 0; proj < listProjects.length; proj++) {
                const listBranches = await client.branches.list({
                    projectId: listProjects[proj].id
                });
                branches.push(listBranches);

                for (var branch = 0; branch < listBranches.length; branch++) {
                    const listFiles = await client.files.list({
                        projectId: listProjects[proj].id,
                        branchId: listBranches[branch].id
                    });
                    files.push(listFiles);

                    for (var file = 0; file < listFiles.length; file++) {
                        const listLayers = await client.layers.list({
                            projectId: listProjects[proj].id,
                            branchId: listBranches[branch].id,
                            fileId: listFiles[file].id
                        });
                        layers.push(listLayers);


                        listLayers.forEach(layer => {
                            var tempVar = layer.name;
                            tempVar = tempVar.replace("/", "?");
                            const startIndex = tempVar.indexOf("?");
                            if (tempVar.indexOf("/") !== -1){
                                console.log(layer.name.substring(startIndex + 1, tempVar.indexOf("/")));
                                mySet.add(layer.name.substring(startIndex + 1, tempVar.indexOf("/")));
                            }
                            else {
                                tempVar = tempVar.replace("?", "/");
                                console.log(layer.name.substring(0, tempVar.indexOf("/")));
                                mySet.add(layer.name.substring(0, tempVar.indexOf("/")));
                            }
                        })

                    }
                }
            }
            setAssets(mySet);
            setLoad(false);
        }
        getAllComponents();

        return function cleanup() {
            abortController.abort();
        }
    }, []);

    return (
        <div className={classes.branch}>
            <CustomDrawer assets={assets} filterAssets={(x) => filterAssets(x)} />
            <Toolbar />
            <div className={classes.components}>
                {temp.length ?
                    temp.map((item, index) => (
                        <div className={classes.imageDistance} key={item.id}>
                            <h3>{item.name.substring(item.name.lastIndexOf("/") + 1)}</h3>
                            <img className={classes.image} id={item.id} src={pics[item.id]} alt="I'm working on it. Please be patient!" />
                            <a key={componentUrls[index]} href={componentUrls[index]}>
                                Like me? Click here.
                            </a>
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



//bb75ec9c833a43d50607d1b10ed72ae04cae4180e6eb803f228314a26a84545a