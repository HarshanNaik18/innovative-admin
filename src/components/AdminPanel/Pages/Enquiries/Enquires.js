import React, { useState, useEffect } from 'react'
import './Enquires.css'
import { db } from '../../../../Firebase/Firebase'
import { addDoc, collection, doc, onSnapshot, query } from 'firebase/firestore';
import { storage } from '../../../../Firebase/Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function Enquires() {

    const [name, setName] = useState('');
    const [domain, setDonain] = useState('');
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [codes, setCodes] = useState([]);
    const [reports, setReports] = useState([]);


    const demoRef = collection(db, "demo");
    const [display, setDisplay] = useState([]);

    const sendMail = (e) =>{
        e.preventDefault();

        const config = {
            Host: "smtp.elasticemail.com",
            Username: "iplinnovative685@gmail.com",
            Password: "D55DADE0B03DFB8ADD0AAC4A10504070590F",
            Port:2525,
            To: 'naikharshan18@gmail.com',
            From: "iplinnovative685@gmail.com",
            Subject: "Innovative request verifification",
            Body: "Nakkan muchkond ivaga login madogolo"
          };
      
          if(window.Email){
            window.Email.send(config).then(()=>console.log("Mail sent"));
          }
    }

    const handleImageChange = async (files) => {
        for (var i = 0; i < files.length; i++) {
            const newImage = files[i];
            setImages(arr => [...arr, newImage]);
        }
    }
    const handleVideoChange = async (files) => {
        for (var i = 0; i < files.length; i++) {
            const newVideo = files[i];
            setVideos(arr => [...arr, newVideo]);
        }
    }
    const handleCodeChange = async (files) => {
        for (var i = 0; i < files.length; i++) {
            const newCode = files[i];
            setCodes(arr => [...arr, newCode]);
        }
    }
    const handleReportChange = async (files) => {
        for (var i = 0; i < files.length; i++) {
            const newReport = files[i];
            setReports(arr => [...arr, newReport]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Wait !!!!!");
        const imageURL = [];
        for (var i = 0; i < images.length; i++) {
            const imgRef = ref(storage, `${name}/images/${images[i].name}`);
            await uploadBytes(imgRef, images[i]).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(url => {
                    imageURL.push(url);
                });
            });
        }
        console.log("img done");

        const videoURL = [];
        for (i = 0; i < videos.length; i++) {
            const videoRef = ref(storage, `${name}/videos/${videos[i].name}`);
            await uploadBytes(videoRef, videos[i]).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(url => {
                    videoURL.push(url);
                });
            });
        }
        console.log("video done");

        const codesURL = [];
        const codeName=[];
        for ( i = 0; i < codes.length; i++) {
            const codeRef = ref(storage, `${name}/code/${codes[i].name}`);
            await uploadBytes(codeRef, codes[i]).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(url => {
                    codesURL.push(url);
                });
            });
            codeName.push(codes[i].name);
        }
        console.log("code done");

        const reportURL = [];
        const reportName=[];
        for ( i = 0; i < reports.length; i++) {
            const reportRef = ref(storage, `${name}/report/${reports[i].name}`);
            await uploadBytes(reportRef, reports[i]).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(url => {
                    reportURL.push(url);
                });
            });
            reportName.push(reports[i].name);
        }
        console.log("report done");

        await addDoc(demoRef, {
            title: name,
            user:"Username",
            usn:"1BG21ISYYY",
            branch:"ISE",
            sem:2,
            domain:"Electronics",
            images: imageURL,
            videos:videoURL,
            flag: false,
            code:codesURL,
            codeName:codeName,
            report:reportURL,
            reportName:reportName,
            desc:"An automation of irrigation systems has several positive effects. Once installed, the water distribution on fields or small-scale gardens is easier and does not have to be permanently controlled by an operator. There are several solutions to design automated irrigation systems. Modern big-scale systems allow big areas to be managed by one operator only. Sprinkler, drip or subsurface drip irrigation systems require pumps and some high tech-components and if used for large surfaces skilled operators are also required. Extremely high-tech solutions also exist using GIS and satellites to automatically measure the water needs content of each crop parcel and optimise the irrigation system. But automation of irrigation can sometimes also be done with simple, mechanical appliances: with clay pot or porous capsule irrigation networks or bottle irrigation (see also manual irrigation).Automation of irrigation systems refers to the operation of the system with no or minimum manual interventions. Irrigation automation is justified where a large irrigated area is divided into small segments called irrigation blocks and segments are irrigated in sequence to match the discharge available from the water source. There are six high-tech automation systems, which are described below. Irrigation time clock controllers, or timers, are an integral part of an automated irrigation system. A timer is an essential tool to apply water in the necessary quantity at the right time. Timers can lead to an under- or over-irrigation if they are not correctly programmed or the water quantity is calculated incorrectly (CARDENAS-LAILHACAR 2006). Time of operation (irrigation time – hrs per day) is calculated according to volume of water (water requirement - litres per day) required and the average flow rate of water (application rate – litres per hours). A timer starts and stops the irrigation process (RAJAKUMAR et al. 2008 and IDE n.y.).",
        });
        console.log("Uploaded");
    }

    const handleShow = async (e) => {
        e.preventDefault();
        const q = query(demoRef);
        const data = [];
        onSnapshot(q, querySnapshot => {
            querySnapshot.forEach(element => {
                data.push({ ...element.data(), id: element.id });
            });
            setDisplay(data);
        });
        addDoc(collection(db,"projects"),{
            hii:data[0].images
        }).then(
            console.log("Added")
        ).catch((err)=>console.log(err))
    }

    return (
        <div className='project_main_body'>
            <div className='project_body_container'>
                <div className='enquiry_header'>
                    <center><h1>Demo</h1></center>
                </div>
                <div className='enquiry_body'>
                    <form method='post'>
                        <input type='text' placeholder='name' onChange={(e) => setName(e.target.value)} />
                        <select value={domain} onChange={(e) => setDonain(e.target.value)}>
                            <option value=''>All</option>
                            <option value='one'>One</option>
                            <option value='two'>two</option>
                        </select>
                        <span><label>Images : </label>  <input type='file' multiple onChange={(e) => handleImageChange(e.target.files)} /></span>
                        <span><label>videos : </label>  <input type='file' multiple onChange={(e) => handleVideoChange(e.target.files)} /></span>
                        <span><label>Codes : </label>  <input type='file' multiple onChange={(e) => handleCodeChange(e.target.files)} /></span>
                        <span><label>Report files : </label>  <input type='file' multiple onChange={(e) => handleReportChange(e.target.files)} /></span>
                        
                        <button onClick={handleSubmit}>submit</button>
                    </form>
                    <button onClick={handleShow}>Show</button>
                </div>
                {
                    display.map((pack, index) => (
                        // <video width="500" height="500" controls >
                        //     <source src={img} type="video/mp4" />
                        // </video>
                        <div>
                            <h2>{pack.name}</h2>
                            <img src={pack.images[0]} width='500px' alt='img' />
                        </div>
                    ))
                }
            </div>
            <button onClick={sendMail}>Send mail</button>
        </div>
    )
}

export default Enquires
