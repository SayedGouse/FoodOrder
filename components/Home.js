import React, { useEffect, useState } from 'react'
// import logo from '../Assets/sweet1.jpg'
import axios from 'axios';

function Home() {
  const [foodlist,setfoodlist]=useState([])

  useEffect(()=>{
    getfood();
  }, []);

  const getfood= async()=>{
    const result =await axios.get("http://localhost:3001/home");
    setfoodlist(result.data);
    console.log(result.data);
  }

  const login=(e)=>{
    window.location="http://localhost:3000/login"
  }

  
  return (  
    <div>
      <div className='container-fluid bg-primary mt-3 p3'>
        <div className='row'>
            <h1 className='text-white'> Food Order System</h1>
            <p><button className='btn btn-warning text-white'onClick={login}>Log in</button></p>
        </div>
      </div>

      <div className='container-fluid bg-light mt-3 p-3'>
        <div className='row'>
          <h3 className='text-danger'>
            List Of Menu Items
          </h3>

          <div className='divider py-1 bg-success'> </div>

          {
 foodlist.map((food)=>{

              return(
                <>
            <div className='col-lg-3 mt-2'>
            <h2 key={food.id}>{food.category}</h2>
            <p><img src={`../upload/${food.image}`} alt='not found' width={200} height={200} className='rounded-circle'></img></p>
            <p>₹{food.price}</p>
            <p> <button className='btn btn-danger text-white'><a href='/login' style={{textDecoration:"none",color:"white"}}> Buy</a></button></p>
          </div>
                </>
              )
            })

          };
         


        </div>

      </div>
    </div>
  )
}

export default Home
