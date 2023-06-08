import axios from 'axios'
import React, { useEffect, useState } from 'react'


const utype = localStorage.getItem('log')

//rfce
const Navbar =()=>{

  const [CategoryList,setCategoryList] = useState([])

  const logout =()=>{
  localStorage.clear()
  window.location = 'http://localhost:3000/login';

  }

  
  useEffect(() => { 
    getCategory();   
  }, []);

  const getCategory = async() => {
    const result = await axios.get("http://localhost:3001/categorylist");
    setCategoryList(result.data);
    console.log(result.data);
  };

if(utype==="user")
{
  return(
    <div>
        <nav className='navbar navbar-expand-sm bg-dark navbar-dark'>
            <div className='container-fluid'>
              <span className='text-brand text-white fs-2'>Delicious Food| User</span>
                <ul className='navbar-nav'>
                    <li className='nav-item'><a href='/userhome' className='nav-link'> UserHome</a></li>


                       <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="/userhome" role="button" data-bs-toggle="dropdown">Menu</a>

                    <ul class="dropdown-menu bg-warning" style={{border:"1px solid black",}}>
                    {
                      CategoryList.map((cat,index) => {
                        return(
                        <li class="dropdown-item fw-bold"><a href={`catwise/${cat.category_name}` } style={{textDecoration:"none",color:"black"}}> {cat.category_name} </a></li>
                      )
                    }
                    )}
                    
                  </ul>
                  </li>     
                    <li className='nav-item'><a href='/feedback' className='nav-link'>Feedback</a></li>
                    <li className='nav-item'><a href='/customerorder' className='nav-link'>Cart Or payment</a></li>
                    <li className='nav-item'><button className='btn btn-danger' onClick={logout}>Logout</button></li>
                </ul>
           </div>
        </nav>
    </div>
  )
}
else if(utype==="admin")
{
  return(
    <div>
        <nav className='navbar navbar-expand-sm bg-dark navbar-dark'>
            <div className='container-fluid'>
              <span className='text-brand text-white fs-2'>DashBoard | Admin</span>
                <ul className='navbar-nav'>
                    <li className='nav-item'><a href='/adminhome' className='nav-link'>AdminHome</a></li>
                    <li className='nav-item'><a href='/displayreg' className='nav-link'>Display Users</a></li>
                    <li className='nav-item'><a href='/viewfooditem'  className='nav-link'> View Food Item </a></li>
                    <li className='nav-item'><a href='/addfood' className='nav-link'>Addfood</a></li>
                    <li className='nav-item'><a href='/allorder' className='nav-link'>All Order</a></li>
                    <li className='nav-item'><a href='/viewfeedback' className='nav-link'>ViewFeedback</a></li>
                    <li className='nav-item'><a href='/serviceorder' className='nav-link'> Status </a></li>
                    
                    {/* <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="/adminhome" role="button" data-bs-toggle="dropdown">Service</a>

                    <ul class="dropdown-menu" >
                  
                  <li className='dropdown-item fw-bold'><a href='/serviceorder' style={{color:"black"}} className='nav-link'> Orders </a></li>
                  <li className='dropdown-item fw-bold'><a href='/servicehome' style={{color:"black",fontSize:"11px"}} className='nav-link'> About Delicious Food </a></li>
                        
             
                    
                  </ul>
                  </li>    */}

                    <li className='nav-item'><button className='btn btn-danger' onClick={logout}>Logout</button></li>
                </ul>
           </div>
        </nav>
    </div>
  )
}

else {

  return (
    <div>
        <nav className='navbar navbar-expand-sm bg-dark navbar-dark'>
            <div className='container-fluid'>
              <span className='text-brand text-white fs-2'>Delicious Food| normal</span>
                <ul className='navbar-nav'> 
                   <li className='nav-item'><a href='/' className='nav-link'> Home</a></li>
                    <li className='nav-item'><a href='/login' className='nav-link'>Login</a></li>
                    <li className='nav-item'><a href='/about' className='nav-link'> About</a></li>
                    <li className='nav-item'><a href='/contact' className='nav-link'> Contact</a></li>
                    <li className='nav-item'><a href='/reg_form' className='nav-link'>Sign up</a></li>
                </ul>
            </div>
        </nav>    
    </div>
  )
}
}


export default Navbar
