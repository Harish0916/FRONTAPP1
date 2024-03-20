import React, { useEffect, useState } from 'react'
import '../adduser/add.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { path } from '../../address.js';
import toast from 'react-hot-toast';

const Edit = () => {
  const users = {
    fname: "",
    lname: "",
    email: "",
  }
  const {id} = useParams();
  const navigate = useNavigate()
  const [user, setUser] = useState(users);
  const inputChangeHandler = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]: value})
  }
  
  useEffect(()=>{
    axios.get(`${path}/api/getone/${id}`)
      .then((response)=>{
        setUser(response.data);
      })
      .catch((error)=>{
        console.log(error);
      })
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.put(`${path}/api/updateuser/${id}`, user)
      .then((response)=>{
        // console.log(response);
        toast.success(response.data.message, {position: 'top-right'});
        navigate('/'); // after registration you will be redirect to homepage
      }).catch(error => console.log(error));
  }

  return (
    <div className='addUser'>
      <Link to={"/"}>Back</Link>
      <h3>Update User</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor='fname'>First Name</label>
          <input type='text' onChange={inputChangeHandler} value={user.fname} id='fname' name='fname' autoComplete='off' placeholder='First Name' />
        </div>
        <div className="inputGroup">
          <label htmlFor='lname'>Last Name</label>
          <input type='text' onChange={inputChangeHandler} value={user.lname} id='lname' name='lname' autoComplete='off' placeholder='Last Name' />
        </div>
        <div className="inputGroup">
          <label htmlFor='email'>Email</label>
          <input type='email' onChange={inputChangeHandler} value={user.email} id='email' name='email' autoComplete='off' placeholder='example@mail.com' />
        </div>
        <div className="inputGroup">
          <button type="submit">Update User</button>
        </div>
      </form>
    </div>
  )
}

export default Edit