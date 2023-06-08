import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import logo from '../Assets/sweet1.jpg'

function UserHome() {
    const getuseremail=localStorage.getItem('user')
    //const utype=localStorage.getItem('log')

    const [foodlist,setfoodlist]=useState([])

    useEffect(()=>{
      getfood();
    }, []);
  
    const getfood= async()=>{
      const result =await axios.get("http://localhost:3001/userhome");
      setfoodlist(result.data);
      console.log(result.data);
    }
  return (  
    <div>
      <div className='container-fluid bg-warning mt-3 p3'>
        <div className='row'>
            <h1 className='text-white'> Food Order System |user</h1>
            <p><button className='btn btn-warning text-dark fs-2 fw-bold'>Welcome {getuseremail}</button></p>
        </div>
      </div>

      <div className='container-fluid bg-light mt-3 p-3'>
        <div className='row'>
          <h3 className='text-danger'>
            List Of Items
          </h3>
          <div className='divider py-1 bg-success'> </div>
          {
            foodlist.map((food)=>{

              return(
                <>
            <div className='col-lg-3 mt-2'>
            <h2 key={food.id}>{food.item_name}</h2>
            <p><img src={`../upload/${food.image}`} alt='not found' width={200} height={200} className='rounded-circle'></img></p>
            <p>₹{food.price}</p>
            <p> <button className='btn btn-danger text-white'><a href={`/sendorder/${food.id}`} style={{textDecoration:"none",color:"white"}}> Buy </a></button></p>
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

export default UserHome
