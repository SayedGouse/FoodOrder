import axios from 'axios';
import React from 'react'
import {useParams} from 'react-router-dom'

let uid=localStorage.getItem('user');
const Paybill = () => {

const {id}=useParams();
const {price}=useParams();
console.log(id)
console.log(price)

const paymenthandler=async(e)=>{
    e.preventDefault();

    var options={
        key:"rzp_test_zAFMKYVT8m0MlG",
        key_secret:"rSZpQPQlrHLZcTlMrGV3Pax0",
        amount:price*100,
        currency:"INR",
        name:"Delicios food order",
        description:"For testing purpose",

        handler:function(response){
            //alert(response.razorpay_payment_id)
            axios.post(`http://localhost:3001/paybill/${id}`,{
                price:price,
                payment_id:response.razorpay_payment_id,
                uid:uid
            }).then((response)=>{
                console.log(response);
                alert("Payment has been done successfully")
                window.location="http://localhost:3000/customerorder"
            }).catch(error=>{
                console.log(error)
            })
        },
        prefill:{
            name:"salman",
            email:"sayedgouse1995@gmail.com",
            contact:"7338203380"
        },
        notes:{
            address:"Razorpay Corporate Office"
        },
        them:{
            color:"#686CFD"
        }
    };
    var pay=new window.Razorpay(options);
    pay.open()
}
  return (
    <div>
      <h1>Pay order Bill Amount</h1>

      <button className='btn btn-warning fw-bold text-white' onClick={paymenthandler}>Pay now</button>
    </div>
  )
}

export default Paybill
