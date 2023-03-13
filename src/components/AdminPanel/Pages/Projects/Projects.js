import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../../Firebase/Firebase';
import React, { useState, useEffect } from 'react'
import ProjectCard from '../../ProjectCard/ProjectCard'
import './Projects.css'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Projects() {

    const [unverifiedProjects, setUnverifiedProjects] = useState([]);
    const [displayProjects, setDisplayProjects] = useState([]);
    const [searchData, setSearchData] = useState('');
    const projectRef = collection(db, "projects");
    const domainRef = collection(db, "Domains");


    const verify = async (index) => {
        const project = unverifiedProjects[index];
        for (var i = 0; i < project.videos.length; i++) {
            addDoc(domainRef, {
                videos: project.videos[i],
                title: project.title,
                channelName: project.channelName,
                image: project.image,
                domain: project.domain,
                shortDesc: project.shortDesc,
                date: project.date,
            })
        }
        const id = project.id;
        await updateDoc(doc(db, "projects", id), {
            flag: true,
        }).then(
            toast.success(project.title + " verified", {
                autoClose: 1000,
                pauseOnHover: false,
                closeOnClick: true
            })
        ).catch((err) => console.log(err));
    }

    const deleteProject = (index) => {

        const id = unverifiedProjects[index].id;
        deleteDoc(doc(db, "projects", id))
            .then(
                toast.error(unverifiedProjects[index].title + " deleted", {
                    autoClose: 1000,
                    pauseOnHover: false,
                    closeOnClick: true
                })
            ).catch((err) => console.log(err));
    }

    const filterData = (e) => {
        e.preventDefault();
        const search = e.target.value;
        const data = unverifiedProjects.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
        setDisplayProjects(data);
        setSearchData(search);
    }


    useEffect(() => {
        const q = query(projectRef,orderBy("date","desc"),orderBy("title"),where("flag", "==", false));
        const Fetchdata = onSnapshot(q, querySnapshot => {
            const data = [];
            querySnapshot.forEach(item => {
                data.push({ ...item.data(), id: item.id });
            });
            setUnverifiedProjects(data);
            setDisplayProjects(data);
        });
        return () => {
            Fetchdata();
        }
        //eslint-disable-next-line
    }, []);
    return (
        <div className='project_main_body'>
            <div className='project_body_container'>
                <div className='container_header'>
                    <b>Unverified Projects List</b>
                    <input type='text' placeholder='Project Name' value={searchData} onChange={(e) => filterData(e)} />
                </div>
                <div className='container_body'>
                    {
                        (displayProjects.length > 0) ?
                            displayProjects.map((project, index) => (
                                <div className='project_card'>
                                    <ProjectCard
                                        project={project}
                                    />
                                    <div className='project_verify'>
                                        <button style={{ background: 'red' }} onClick={() => deleteProject(index)} >Delete <i class="fa fa-times" aria-hidden="true" /></button>
                                        <button style={{ background: 'green' }} onClick={() => verify(index)} >Verify <i class="fa fa-check" aria-hidden="true" /></button>
                                    </div>

                                </div>
                            ))
                            : <h3>No Projects Available</h3>
                    }
                </div>
            </div>
        </div>
    )
}

export default Projects