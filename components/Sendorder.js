import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

let uid=localStorage.getItem('user');

const Sendorder = () => {
    const {id}= useParams();
    console.log("Item Id:"+id)
    const [qty,setqty] =useState(1)

    const handlechange =(e)=>{
        setqty(e.target.value);
    }

    const sendqty=(e)=>{
        e.preventDefault();
        axios.post(`http://localhost:3001/sendorder/${id}`,{
            qty:qty,
            id:id,
            uid:uid
        }).then((response)=>{
            console.log(response);
            alert("thanks for order")
            window.location="http://localhost:3000/userhome"
        })
         .catch(error=>{
        console.log(error)
    })
    }
  return (
    <div>
      <div className='container'>
        <div className='row'>
            <h1>Send Your Order</h1>
            <form onSubmit={sendqty}>
                <div>
                    <input type='number' min={1} name='qty' className='form-control' value={qty} onChange={handlechange}/>
                </div>
                <p><button className='btn btn-success'>Send</button></p>
            </form>
             
        </div>
      </div>
    </div>
  )
}

export default Sendorder
