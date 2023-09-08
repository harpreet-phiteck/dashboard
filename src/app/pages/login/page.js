'use client'
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../signup/signup.css';
export default function Signup(){
    const [userData,setData] = useState({})
    const router = useRouter()
    useEffect(() =>{
        localStorage.setItem("user",JSON.stringify(userData));
      },[userData])
    const getData = (data)=>{
        setData({
            ...userData,[data.target.name]: data.target.value
        })             
    }
    const collectData = async(e)=>{
        e.preventDefault()
        let  result = await fetch('http://localhost:5500/login',{
            method: 'POST',
            body:JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const response = await result.json(); 
        if(response.auth){
          localStorage.setItem("user",JSON.stringify(response.user));   
          localStorage.setItem("token",JSON.stringify(response.auth));   
          response.result? "":router.push('/pages/profile')
        }
    }
    return(
        <section className='signup_section'>
        <div className="signup-container">
    <h2>Login Here</h2>
    <form>
      <div className="input-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder='Enter Email Address' required onChange={getData}/>
      </div>
      <div className="input-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" placeholder='Enter Password'required onChange={getData}/>
      </div>
      <button type="submit" onClick={collectData} className="btn-signup">Login</button>
    </form>
  </div>
        </section>
    )
}