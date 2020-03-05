import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomAppBar from '../CustomAppBar';
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

export default function LandingPage() {

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
        setShowList(projs.filter(x => x.name.toLowerCase().includes(searchTerm.toLowerCase())))
    }, [searchTerm]);

    if (page === "BRANCH") {
        return (
            <div>
                <CustomAppBar onSearch={searchTerm} />
                <Branches showList={projs} projId={pId} />
            </div>
        );
    }
    else
        return (
            <div style={{ background: '#fafafa' }}>
                <CustomAppBar onSearch={setSearchTerm} />
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

// return (
//     <div className={classes.branch}>
//         <CustomDrawer assets={assets} filterAssets={(x) => filterAssets(x)} />
//         <Toolbar />
//         <div className={classes.components}>
//             {temp.length ? temp.map(item => (
//                 <div className={classes.imageDistance} key={item.id}>
//                     <h3>{item.name.substring(item.name.lastIndexOf("/") + 1)}</h3>
//                     <img className={classes.image} id={item.id} src={pics[item.id]} alt="Component" />
//                 </div>
//             )) :
//                 <div className={classes.componentText}>
//                     <h2>What is a component?</h2>
//                     <div style={{ marginBottom: '8%' }}>A UI element that can be used more than twice in the same way and can be broken down to its basics. It can have variants or variations (i.e. pagination with or without next arrows). It doesn’t usually have an opinion on content or task. For opinionated uses of components, see patterns.</div>
//                     <h2>Are these all of the components?</h2>
//                     <div style={{ marginBottom: '8%' }}>Nope. While just a fraction of the total system, we think it’s representative of the whole and a good introduction without losing the forest for the trees.</div>
//                     <h2>Will these components change?</h2>
//                     <div style={{ marginBottom: '8%' }}>Yup. These components are managed by a rotating group of designers and a dedicated team of front-end engineers working in partnership. This means that what designers create and what the engineers build is always up-to-date. Because designers pull from the same Sketch UI kit and because engineers pull from the same codebase, when these teams adjust or add components, those components are updated for everyone.</div>
//                 </div>}
//         </div>
//     </div>
// );
// function filterAssets(helper) {
//     setTemp(layer.filter(item => item.name.includes(helper)));
// }
// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
// useEffect(() => {
//     async function fetchData() {
//         const image_response = await fetch(
//             "http://localhost:8080/images",
//             {
//                 headers: {
//                     "Accept": "application/json",
//                     "Content-Type": "application/json"
//                 }
//             }
//         );
//         const image_body = await image_response.json();
//         setImages(image_body);
//     }
//     fetchData();
// }, []);
// async function makePostRequest() {
//     fetch("http://localhost:8080/images", {
//         method: "POST",
//         headers: {
//             "content-type": "application/json",
//             accept: "application/json"
//         },
//         body: JSON.stringify(binaryImagesList.map(x => { return { base64String: x } }))
//     });
// }
// function showImages(item) {
//     for (var i = 0; i < lsLayer.length; i++) {
//         const layer = lsLayer[i]
//         myMap[layer.id] = `data:image/png;base64,${item}`;
//     }
// }

// import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import CustomDrawer from '../CustomDrawer';
// import { Toolbar } from '@material-ui/core';


// const useStyles = makeStyles(theme => ({
//     branch: {
//         marginLeft: '25%'
//     },
//     components: {
//         textAlign: 'center',
//     },
//     image: {
//         minHeight: '80px',
//         minWidth: '80px',
//         maxWidth: '1000px'
//     },
//     imageDistance: {
//         marginTop: '5%'
//     },
//     componentText: {
//         textAlign: 'left',
//         color: 'rgb(51,71,91)',
//         fontWeight: 400
//     },
// }));

// export default function Branches(props) {

//     const classes = useStyles();
//     const pid = props.projId;
//     const [branch, setBranch] = useState([]);
//     const [file, setFile] = useState([]);
//     const [layer, setLayer] = useState([]);
//     const [images, setImages] = useState([]);
//     const [filteredComponent, setFilteredComponent] = useState([]);

//     function filterAssets(helper) {
//         setFilteredComponent(layer.filter(item => item.name.includes(helper)));
//     }

//     useEffect(() => {
//         async function fetchDataFromDB() {
//             const image_response = await fetch(
//                 "http://localhost:8080/images",
//                 {
//                     headers: {
//                         "Accept": "application/json",
//                         "Content-Type": "application/json"
//                     }
//                 }
//             );
//             const image_body = await image_response.json();
//             setImages(image_body);
//         }
//         fetchDataFromDB();
//     }, []);

//     if (images.length === 0) {
//         getItems();
//         //makePostRequest();
//     }

//     // async function makePostRequest() {
//     //     fetch("http://localhost:8080/images", {
//     //         method: "POST",
//     //         headers: {
//     //             "content-type": "application/json",
//     //             accept: "application/json"
//     //         },
//     //         body: JSON.stringify(binaryImagesList.map(x => { return { base64String: x } }))
//     //     });
//     // }

//     async function getItems() {
//         const Abstract = require('abstract-sdk');
//         const client = new Abstract.Client({
//             accessToken: 'bb75ec9c833a43d50607d1b10ed72ae04cae4180e6eb803f228314a26a84545a'
//         });

//         const listBranch = await client.branches.list({
//             projectId: pid
//         });
//         setBranch(listBranch);

//         const listFile = await client.files.list({
//             projectId: pid,
//             branchId: listBranch[0].id
//         });
//         setFile(listFile);

//         const listLayer = await client.layers.list({
//             projectId: pid,
//             branchId: listBranch[0].id,
//             fileId: listFile[0].id
//         });
//         setLayer(listLayer);

//         for(var i=0;i<listLayer.length;i++){        
//             const imageBuffer = await client.previews.raw({
//                 projectId: pid,
//                 branchId: listBranch[0].id,
//                 fileId: listFile[0].id,
//                 layerId: listLayer[i].id,
//                 sha: "latest"
//             });

//             var arrayBufferView = new Uint8Array(imageBuffer);
//             var base64String = btoa(String.fromCharCode.apply(null, arrayBufferView));
//             console.log(base64String);
//         }
//     }

//     function logconsole() {
//         console.log(branch);
//         console.log(file);
//         console.log(layer);
//     }

//     return (
//         <div className={classes.branch}>
//             <Toolbar />
//             <Toolbar />
//             <button onClick={logconsole}>Click me for console</button>
//             {/* <CustomDrawer assets={assets} filterAssets={(x) => filterAssets(x)} />
//             <Toolbar />
//             <div className={classes.components}>
//                 {temp.length ? temp.map(item => (
//                     <div className={classes.imageDistance} key={item.id}>
//                         <h3>{item.name.substring(item.name.lastIndexOf("/") + 1)}</h3>
//                         <img className={classes.image} id={item.id} src={pics[item.id]} alt="Component" />
//                     </div>
//                 )) :
//                     <div className={classes.componentText}>
//                         <h2>What is a component?</h2>
//                         <div style={{ marginBottom: '8%' }}>A UI element that can be used more than twice in the same way and can be broken down to its basics. It can have variants or variations (i.e. pagination with or without next arrows). It doesn’t usually have an opinion on content or task. For opinionated uses of components, see patterns.</div>
//                         <h2>Are these all of the components?</h2>
//                         <div style={{ marginBottom: '8%' }}>Nope. While just a fraction of the total system, we think it’s representative of the whole and a good introduction without losing the forest for the trees.</div>
//                         <h2>Will these components change?</h2>
//                         <div style={{ marginBottom: '8%' }}>Yup. These components are managed by a rotating group of designers and a dedicated team of front-end engineers working in partnership. This means that what designers create and what the engineers build is always up-to-date. Because designers pull from the same Sketch UI kit and because engineers pull from the same codebase, when these teams adjust or add components, those components are updated for everyone.</div>
//                     </div>}
//             </div> */}
//         </div>
//     );

// }

// for (var i = 0; i < lsLayer.length; i++) {
//     await sleep(300);
//     const layer = lsLayer[i]
//     client.previews.raw({
//         projectId: pid,
//         branchId: listBranch[0].id,
//         fileId: lsFile[0].id,
//         layerId: layer.id,
//         sha: "latest"
//     }).then(
//         imageBuffer => {
//             var arrayBufferView = new Uint8Array(imageBuffer);
//             var binary = '';
//             var bytes = arrayBufferView
//             var len = bytes.byteLength;
//             for (var i = 0; i < len; i++) {
//                 binary += String.fromCharCode(bytes[i]);
//             }
//             binary = btoa(binary);
//             binaryList.push(binary);
//             console.log(binary);
//             myMap[layer.id] = `data:image/png;base64,${binary}`

//         }
//     )
// }
// setBinaryImagesList(binaryList);
// setPics(myMap);