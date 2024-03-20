import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { path } from '../../address.js';
import "./user.css"

const User = () => {
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await axios.get(`${path}/api/getall`);
            setUsers(response.data);
        }
        fetchData();
    }, []);
  return (
    <div className='userTable'>
        <Link to={"/add"} className='addButton'>Add User</Link>
        <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index)=>{
                        return (
                            <tr key={user._id}>
                                <td>{index+1}</td>
                                <td>{user.fname} {user.lname}</td>
                                <td>{user.email}</td>
                                <td className='actionButtons'>
                                    <button><i className="fa-solid fa-trash"></i></button>
                                    <Link to={`/edit/`+user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default User