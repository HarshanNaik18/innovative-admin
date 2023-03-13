import { collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../../Firebase/Firebase';
import React, { useState, useEffect } from 'react'
import ProjectCard from '../../ProjectCard/ProjectCard'
import '../Projects/Projects.css'
import './Domains.css'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function Domains() {

    const [allProjects, setAllProjects] = useState([]);
    const [filterProjects, setFilterProjects] = useState([]);
    const [displayProjects, setDisplayProjects] = useState([]);
    const [branchProjects, setBranchProjects] = useState([]);
    const [domain, setDomain] = useState('');
    const [sem, setSem] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [search, setSearch] = useState('');
    const [branch, setBranch] = useState('');
    const projectRef = collection(db, "projects");

    // const blockProject = (index) => {
    //     const temp = displayProjects[index];
    //     updateDoc(doc(db, "projects", temp.id), {
    //         flag: false,
    //     }).then(
    //         toast.warning(displayProjects[index].title + " blocked", {
    //             autoClose: 1000,
    //             pauseOnHover: false,
    //             closeOnClick: true
    //         })
    //     ).catch((err) => console.log(err));
    //     const q = query(collection(db, "Domains"), where("title", "==", temp.title), where("domain", "==", temp.domain));
    //     const data = [];
    //     onSnapshot(q, querySnapshot => {
    //         querySnapshot.forEach((item) => {
    //             data.push(item.id);
    //         });
    //         data.forEach(id => {
    //             deleteDoc(doc(db, "Domains", id)).catch((err) => console.log(err));
    //         })
    //     });
    // }

    const deleteProject = (index) => {
        const id = displayProjects[index].id;
        const temp = displayProjects[index];
        deleteDoc(doc(db, "projects", id))
            .then(
                toast.error(displayProjects[index].title + " deleted", {
                    autoClose: 1000,
                    pauseOnHover: false,
                    closeOnClick: true
                })
            ).then((err) => console.log(err));

        const q = query(collection(db, "Domains"), where("title", "==", temp.title), where("domain", "==", temp.domain));
        const data = [];
        onSnapshot(q, querySnapshot => {
            querySnapshot.forEach((item) => {
                data.push(item.id);
            });
            data.forEach(id => {
                deleteDoc(doc(db, "Domains", id)).catch((err) => console.log(err));
            })
        });
    }

    const FilterDomain = (e) => {
        e.preventDefault();
        const dropItem = e.target.value;
        // console.log(data);
        if (dropItem.length > 0) {
            const data = allProjects.filter(item => item.domain.toLowerCase() === dropItem.toLowerCase());
            setDisplayProjects(data);
            setFilterProjects(data);
            setSearchData(data);
            setBranchProjects(data);
        } else {
            setDisplayProjects(allProjects);
            setFilterProjects(allProjects);
            setSearchData(allProjects);
            setBranchProjects(allProjects)
        }
        setDomain(dropItem);
    }

    const filterBranch = async (e) => {
        e.preventDefault();
        const dropItem = e.target.value;
        console.log(dropItem);
        if (dropItem.length > 0) {
            const data = filterProjects.filter(item => item.branch.toLowerCase() === dropItem.toLowerCase());
            setDisplayProjects(data);
            setBranchProjects(data);
            setSearchData(data);
        } else {
            setDisplayProjects(filterProjects);
            setBranchProjects(filterProjects);
            setSearchData(filterProjects);
        }
        setBranch(dropItem);
    }

    const filterSem = (e) => {
        e.preventDefault();
        const data = e.target.value;
        if (data === 0) {
            setSearchData(searchData);
            setDisplayProjects(filterProjects);
        }
        else {
            const projects = branchProjects.filter(item => item.sem === data);
            setDisplayProjects(projects);
            setSearchData(projects);
        }
        setSem(data);
    }

    const searchProject = (e) => {
        e.preventDefault();
        const getSearch = e.target.value;
        const data = searchData.filter((item) => item.title.toLowerCase().includes(getSearch.toLowerCase()));
        setDisplayProjects(data);
        setSearch(getSearch);
    }

    useEffect(() => {
        const q = query(projectRef, where("flag", "==", true));
        const Fetchdata = onSnapshot(q, querySnapshot => {
            const data = [];
            querySnapshot.forEach(item => {
                data.push({ ...item.data(), id: item.id });
            });
            setAllProjects(data);
            setDisplayProjects(data);
            setFilterProjects(data);
            setBranchProjects(data);
            setSearchData(data);
        });
        return () => {
            Fetchdata();
        }
        //eslint-disable-next-line
    }, []);



    return (
        <div className='project_main_body'>
            <div className='project_body_container'>
                <div className='domain_container_header'>
                    <h1 style={{ borderBottom: '1px solid #444', textAlign: 'center' }}>Projects List</h1>
                    <div className='domain_container_header_base'>
                        <select value={domain} onChange={(e) => FilterDomain(e)}>
                            <option value=''>All Domains</option>
                            <option value='chemistry'>Chemistry</option>
                            <option value='electrical'>Electical</option>
                            <option value='electronics'>Electronics</option>
                            <option value='iot'>IoT</option>
                            <option value='mobile_appication'>Mobile Application Develpment</option>
                            <option value='physics'>Physics</option>
                            <option value='web_technology'>Web Technology</option>
                        </select>

                        <select value={branch} onChange={(e) => filterBranch(e)}>
                            <option value=''>All Branchs</option>
                            <option value='aiml'>AIML</option>
                            <option value='ces'>CEC</option>
                            <option value='ece'>ECE</option>
                            <option value='eee'>EEE</option>
                            <option value='ise'>ISE</option>
                            <option value='me'>ME</option>
                        </select>

                        <select value={sem} onChange={(e) => filterSem(e)}>
                            <option value=''>All Sems</option>
                            <option value='1'>I</option>
                            <option value='2'>II</option>
                            <option value='3'>III</option>
                            <option value='4'>IV</option>
                            <option value='5'>V</option>
                            <option value='6'>VI</option>
                            <option value='7'>VII</option>
                            <option value='8'>VIII</option>
                        </select>

                        <input type='text' placeholder='Project Name' value={search} onChange={(e) => searchProject(e)} />

                    </div>
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
                                        {/* <button style={{ background: 'gold' }} onClick={() => blockProject(index)} >Block <i class="fa fa-ban" aria-hidden="true" /></button> */}
                                    </div>

                                </div>
                            )) : <h3>No Projects Available</h3>
                    }
                </div>
            </div>
        </div>
    )
}

export default Domains
