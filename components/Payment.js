import { useState } from "react"
import axios from "axios"

const Payment = () => {

    const initialvalue ={ userid:"",orderid:"",amount:"",Payment_date:""}
    const [formvalue,setformvalue] =useState(initialvalue)

    const handlechange =(e)=>{
        const {name,value}=e.target
        setformvalue({...formvalue,[name]:value});
        console.log(formvalue)
    }
    const payment =(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/payment",{
            paymentdata:formvalue
        }).then((response)=>{
            console.log(response);
            alert("done")
            window.location="http://localhost:3000/adminhome"
    
        }).catch(error=>{
            console.log(error)
        })
            
        }
    return (
      <div>
              <div  className='container mt-2'>
                     <div className='row'>
                          <form onSubmit={payment}>
                          <div className='mt-2 mb-2'>
                                  <input type='text' name='userid' value={formvalue.userid}
                                  className='form-control ' placeholder='Enter your userid' onChange={handlechange}  required/>    
                              </div>
                              <div className='mt-2 mb-2'>
                              <input type='text' name='orderid' value={formvalue.orderid}
                                  className='form-control ' placeholder='Enter you orderid' onChange={handlechange} required/>    
                              </div>
                              <div className='mt-2 mb-2'>
                                  <input type='text' name='amount' value={formvalue.amount}
                                  className='form-control ' placeholder='Enter your amount' onChange={handlechange}  required/>    
                              </div>
                              <div className='mt-2 mb-2'>
                                  <input type='date' name='Payment_date' value={formvalue.Payment_date}
                                  className='form-control ' placeholder='Enter your Payment_date' onChange={handlechange}  required/>    
                              </div>
                               
                             
  
                              <input type='submit'  className='btn btn-success' value='Submit'  /> 
                          </form>
  
                    </div>
              </div>
      </div>
    )
  }
  
  export default Payment
  