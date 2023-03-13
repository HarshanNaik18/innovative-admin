import React, { useState, useEffect } from 'react'
import './Users.css'
import { db } from '../../../../Firebase/Firebase';
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Users() {
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [unverifiedUsers, setunverifiedUsers] = useState([]);
  const [unverifieSearch, setUnverifiedSearch] = useState('');
  const [verifieSearch, setVerifiedSearch] = useState('');
  const userRef = collection(db, "users");
  const [unverifiedDisplay, setUnverifiedDisplay] = useState([]);
  const [verifiedDisplay, setVerifiedDisplay] = useState([]);

  const VerifyUser = (index) => {
    const config = {
      Host: "smtp.elasticemail.com",
      Username: "iplinnovative685@gmail.com",
      Password: "D55DADE0B03DFB8ADD0AAC4A10504070590F",
      Port:2525,
      To: `${unverifiedUsers[index].email}`,
      From: "iplinnovative685@gmail.com",
      Subject: "Innovative request verified.",
      Body: "Your 'Innovative - Unveil Your Ideas' account is verified by the admin. Now you can login into your account. Thank You, Team Innovative"
    };

    if(window.Email){
      window.Email.send(config).then(()=>console.log("Mail sent"));
    }
    var id = unverifiedUsers[index].id;
    updateDoc(doc(db, "users", id), {
      flag: true,
    }).then(
      toast.success(unverifiedUsers[index].name + " verified", {
        autoClose: 750,
        pauseOnHover: false,
        closeOnClick: true
      })
    ).catch((err) => console.log(err));
  }

  const DeleteUnverifiedUser = (index) => {
    const config = {
      Host: "smtp.elasticemail.com",
      Username: "iplinnovative685@gmail.com",
      Password: "D55DADE0B03DFB8ADD0AAC4A10504070590F",
      Port:2525,
      To: `${unverifiedUsers[index].email}`,
      From: "iplinnovative685@gmail.com",
      Subject: "Innovative request is deleted.",
      Body: "Your 'Innovative - Unveil Your Ideas' account is deleted by the admin. Your credenitals are not not matching with college database. Thank You, Team Innovative"
    };

    if(window.Email){
      window.Email.send(config).then(()=>console.log("Mail sent"));
    }
    deleteDoc(doc(db, "users", unverifiedUsers[index].id)).then(
      toast.error(unverifiedUsers[index].name + " deleted", {
        autoClose: 750,
        pauseOnHover: false,
        closeOnClick: true
      })
    ).catch((err) => console.log(err));
  }

  const BlockUser = (index) => {
    updateDoc(doc(db, "users", verifiedUsers[index].id), {
      flag: false,
    }).then(
      toast.warning(verifiedUsers[index].name + " blocked", {
        autoClose: 750,
        pauseOnHover: false,
        closeOnClick: true
      })
    ).catch((err) => console.log(err));
  }

  const DeleteVerifiedUser = (index) => {
    deleteDoc(doc(db, "users", verifiedUsers[index].id))
      .then(
        toast.error(verifiedUsers[index].name + " deleted", {
          autoClose: 750,
          pauseOnHover: false,
          closeOnClick: true
        })
      ).catch((err) => console.log(err));
  }

  const verifiedUsersSeacrchFunction = (e) => {
    e.preventDefault();
    const search = e.target.value;
    const searchdata = verifiedUsers.filter((item) => item.name.toLowerCase().includes(search) || item.usn.toLowerCase().includes(search));
    setVerifiedDisplay(searchdata);
    setVerifiedSearch(search);
  }

  const unverifiedUsersSeacrchFunction = (e) => {
    e.preventDefault();
    const search = e.target.value;
    console.log(search);
    const searchdata = unverifiedUsers.filter((item) => item.name.toLowerCase().includes(search) || item.usn.toLowerCase().includes(search));
    setUnverifiedDisplay(searchdata);
    setUnverifiedSearch(search);
  }

  useEffect(() => {
    const q1 = query(userRef, where("flag", "==", false));
    const q2 = query(userRef, where("flag", "==", true));

    const unverifiedUsersData = onSnapshot(q1, (querySnapshot) => {
      const unverifiedUsersList = [];
      querySnapshot.forEach(item => {
        unverifiedUsersList.push({ ...item.data(), id: item.id });
      });
      setunverifiedUsers(unverifiedUsersList);
      setUnverifiedDisplay(unverifiedUsersList);
    });
    const verifiedUsersData = onSnapshot(q2, (querySnapshot) => {
      const verifiedUsersList = [];
      querySnapshot.forEach(item => {
        verifiedUsersList.push({ ...item.data(), id: item.id });
      });
      setVerifiedUsers(verifiedUsersList);
      setVerifiedDisplay(verifiedUsersList);
    });

    return () => {
      unverifiedUsersData();
      verifiedUsersData();
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className='users_main_div'>
      <div className='users_main_container'>
        <div className='users_div'>
          <div className='users_header'>
            <b>Unverified Users List</b>
            <input type='text' placeholder='Name / USN' value={unverifieSearch} onChange={(e) => unverifiedUsersSeacrchFunction(e)} />
          </div>
          <div className='users_table'>
            <table>
              <tr style={{ fontSize: '20px', fontWeight: 'bold', zIndex: '1', backgroundColor:'#009880', color:'white' }}>
                <td className='sl_no'>Sl.No</td>
                <td className='name_td'>Name</td>
                <td className='email_td'>Email</td>
                <td className='usn_td'>USN</td>
                <td className='branch_td'>Branch</td>
                <td className='action_td'>Action</td>
              </tr>
              <tbody className='table_body'>
                {
                  (unverifiedDisplay.length > 0) ?
                    (unverifiedDisplay.map((user, index) => (
                      <tr>
                        <td className='sl_no'>{index + 1}</td>
                        <td className='name_td'>{user.name}</td>
                        <td className='email_td'> {user.email} </td>
                        <td className='usn_td'> {user.usn} </td>
                        <td className='branch_td'> {user.branch} </td>
                        <td className='action_td'>
                          <button style={{ background: 'red' }} onClick={() => DeleteUnverifiedUser(index)} >Delete <i class="fa fa-times" aria-hidden="true" /></button>
                          <button style={{ background: 'green' }} onClick={() => VerifyUser(index)}>Verify <i class="fa fa-check" aria-hidden="true" /></button>
                        </td>
                      </tr>
                    )))
                    : (
                      <h2 style={{ padding: '10px', color: 'red' }}> <center>Users Not Found</center> </h2>
                    )

                }
              </tbody>
            </table>
          </div>
        </div>

        <div className='users_div' style={{ marginTop: '2rem', borderTop: '2px solid #444', paddingTop: '2rem' }}>
          <div className='users_header'>
            <b>Verified Users List</b>
            <input type='text' placeholder='Name / USN' value={verifieSearch} onChange={(e) => verifiedUsersSeacrchFunction(e)} />
          </div>
          <div className='users_table'>
            <table>
              <tr style={{ fontSize: '20px', fontWeight: 'bold', zIndex: '1', backgroundColor:'#009880', color:'white' }}>
                <td className='sl_no'>Sl.No</td>
                <td className='name_td'>Name</td>
                <td className='email_td'>Email</td>
                <td className='usn_td'>USN</td>
                <td className='branch_td'>Branch</td>
                <td className='action_td'>Action</td>
              </tr>
              <tbody className='table_body'>
                {
                  (verifiedDisplay.length > 0) ?
                    verifiedDisplay.map((user, index) => (
                      <tr>
                        <td className='sl_no'>{index + 1}</td>
                        <td className='name_td'>{user.name}</td>
                        <td className='email_td'> {user.email} </td>
                        <td className='usn_td'> {user.usn} </td>
                        <td className='branch_td'> {user.branch} </td>
                        <td className='action_td'>
                          <button style={{ background: 'red' }} onClick={() => DeleteVerifiedUser(index)}>Delete <i class="fa fa-times" aria-hidden="true" /></button>
                          <button style={{ background: 'gold' }} onClick={() => BlockUser(index)}>Block <i class="fa fa-ban" aria-hidden="true" /></button>
                        </td>
                      </tr>
                    ))
                    :
                    <h2 style={{ padding: '10px', color: 'red' }}> <center>Users Not Found</center> </h2>
                }
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Users
