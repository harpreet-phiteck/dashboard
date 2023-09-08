"use client"
import './header.css';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
export default function Header(){
  const router = useRouter()
  const login = localStorage.getItem("user")
  const navSignup = ()=>{
    localStorage.removeItem('user')  
      router.push('/pages/signup')
  }
  const path  = usePathname()
    return(
       <header>
        <nav>
        <div className="wrapper">
          <div className="logo"><a href="#">Dashboard</a></div>
          <input type="radio" name="slider" id="menu-btn"/>
          <input type="radio" name="slider" id="close-btn"/>
          <ul className="nav-links">
            <label htmlFor="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
            { login?
            <>
             <li><Link href="/pages/productlist">Products</Link></li>
            <li><Link href="/pages/addproduct">Add Products</Link></li>
            <li><Link href="/pages/updateproduct">Update Products</Link></li>
            <li><Link href="/pages/profile">Profile</Link></li>
           <li><Link href='/pages/signup' onClick={navSignup}>Logout ({JSON.parse(login).name})</Link></li>
           </>
           :
           <>
           <li><Link href="/pages/login">Login</Link></li>,
           <li><Link href="/pages/signup">Signup</Link></li>
           </>
           }            
          </ul>
          <label htmlFor="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
        </div>
      </nav>
 </header>
    )
}