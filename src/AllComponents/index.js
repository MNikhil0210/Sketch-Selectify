import React, { useEffect, useState } from 'react';
import { Toolbar, Link } from '@material-ui/core';
import CustomDrawer from '../CustomDrawer';
import { makeStyles } from '@material-ui/core/styles';
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

export default function AllComponents(props) {

    const classes = useStyles();
    const token = Config.AccessToken.map(x => x.accessToken);
    var [projects, setProjects] = useState([]);
    var [files, setFiles] = useState([]);
    var [layers, listLayers] = useState([]);
    const [assets, setAssets] = useState([]);
    const [load, setLoad] = useState(true);
    const [pics, setPics] = useState([]);
    const [componentUrls, setComponentUrls] = useState([]);
    const myMap = [];
    var [temp, setTemp] = useState([]);
    var binaryList = [];
    const [binaryString, setBinaryString] = useState([]);

    async function filterAssets(helper) {
        while (temp.length) {
            temp.pop();
        }
        while (componentUrls.length) {
            componentUrls.pop();
        }
        var lid;
        const Abstract = require('abstract-sdk');
        const client = new Abstract.Client({
            accessToken: token[0]
        });
        for (var i = 0; i < layers.length; i++) {
            temp.push(layers[i].filter(item => item.name.includes(helper)));
            lid = layers[i];
            var listUrls = [];
            for (var j = 0; j < lid.filter(item => item.name.includes(helper)).length; j++) {
                const layer = lid.filter(item => item.name.includes(helper))[j]
                await client.previews.raw({
                    projectId: layer.projectId,
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
                    projectId: layer.projectId,
                    branchId: "master",
                    fileId: layer.fileId,
                    layerId: layer.id,
                    sha: "latest"
                });
                var tempUrl = urls.webUrl;
                const len = tempUrl.indexOf("commits");
                const commit = tempUrl.substring(0, tempUrl.indexOf("commits"));
                componentUrls.push(commit + "branches/" + "master" + "/" + tempUrl.substring(len, tempUrl.length));

            }
        }

        setBinaryString(binaryList);
        setPics(myMap);
    }

    useEffect(() => {
        const abortController = new AbortController();
        const getAllComponents = async () => {
            const mySet = new Set([]);
            const Abstract = require('abstract-sdk');
            const client = new Abstract.Client({
                accessToken: token[0]
            });

            const listProjects = await client.projects.list();
            projects.push(listProjects);

            for (var proj = 0; proj < listProjects.length; proj++) {
                const listFiles = await client.files.list({
                    projectId: listProjects[proj].id,
                    branchId: "master"
                });
                files.push(listFiles);

                for (var file = 0; file < listFiles.length; file++) {
                    const listLayers = await client.layers.list({
                        projectId: listProjects[proj].id,
                        branchId: "master",
                        fileId: listFiles[file].id
                    });
                    layers.push(listLayers);


                    listLayers.forEach(layer => {
                        var tempVar = layer.name;
                        tempVar = tempVar.replace("/", "?");
                        const startIndex = tempVar.indexOf("?");
                        if (tempVar.indexOf("/") !== -1) {
                            mySet.add(layer.name.substring(startIndex + 1, tempVar.indexOf("/")));
                        }
                        else {
                            tempVar = tempVar.replace("?", "/");
                            mySet.add(layer.name.substring(0, tempVar.indexOf("/")));
                        }
                    })

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

    function TODO() {
        return new Set(Array.from(assets).filter(x => x.toLowerCase().includes(props.searchTerm.toLowerCase())));
    }

    return (
        <div className={classes.branch}>
            <CustomDrawer assets={TODO()} searchTerm={props.searchTerm} filterAssets={(x) => filterAssets(x)} />
            <Toolbar />
            <div className={classes.components}>
                {temp.length ?
                    temp.map((item, idx) => (
                        <div className={classes.imageDistance} key={idx}>
                            {item.map((val, index) => (
                                <div key={index}>
                                    <h3>{val.name.substring(val.name.lastIndexOf("/") + 1)}</h3>
                                    <img className={classes.image} id={val.id} src={pics[val.id]} alt="I'm working on it. Please be patient!" />
                                    <div><Link key={componentUrls[index]} href={componentUrls[index]}>
                                        Like me? Click here.
                                    </Link></div>
                                </div>
                            ))}
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