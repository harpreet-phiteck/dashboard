'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './signup.css';
export default function Signup(){
    const [userData,setData] = useState({})
    const router = useRouter()
    const getData = (data)=>{
        setData({
            ...userData,[data.target.name]: data.target.value
        })             
    }
    const collectData = async(e)=>{
        e.preventDefault()
        let  result = await fetch('http://localhost:5500/register',{
            method: 'POST',
            body:JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const response = await result.json(); 

        localStorage.setItem("user",JSON.stringify(userData));
        router.push('/pages/login')
        console.log(response)
    }
    return(
        <section className='signup_section'>
        <div className="signup-container">
    <h2>Register</h2>
    <form>
      <div className="input-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" placeholder='Enter Name' required onChange={getData} />
      </div>
      <div className="input-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder='Enter Email Address' required onChange={getData}/>
      </div>
      <div className="input-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" placeholder='Enter Password'required onChange={getData}/>
      </div>
      <button type="submit" onClick={collectData} className="btn-signup">Sign Up</button>
    </form>
  </div>
        </section>
    )
}