import axios from "axios"
import { useState } from "react"

const Reg_form = () => {
    const initialvalue ={ fullname:"",city:"",address:"",pincode:"",contact:"",email:"",password:"" }
    const [formvalue,setformvalue] =useState(initialvalue)

    const handlechange =(e)=>{
        const {name,value}=e.target
        setformvalue({...formvalue,[name]:value});
        console.log(formvalue)
    }

    const formSignup =(e)=>{
    e.preventDefault();
    axios.post("http://localhost:3001/user_reg",{
        signupdata:formvalue
    }).then((response)=>{
        console.log(response);
        alert("Thank you for Registration")
        window.location="http://localhost:3000/login"

    }).catch(error=>{
        console.log(error)
    })
        
    }


    return (
      <div>
              <div  className='container mt-2'>
                     <div className='row'>
                        <h1>Create An Account</h1>
                          <form onSubmit={formSignup}>
                          <div className='mt-2 mb-2'>
                                  <input type='text' name='fullname' value={formvalue.fullname}
                                  className='form-control ' placeholder='Enter your Name'  onChange={handlechange}  required/>    
                              </div>
                              <div className='mt-2 mb-2'>
                              <input type='text' name='city' value={formvalue.city}
                                  className='form-control ' placeholder='Enter your city'  onChange={handlechange} required/>    
                              </div>
                              <div className='mt-2 mb-2'>
                                  <input type='text' name='address' value={formvalue.address}
                                  className='form-control ' placeholder='Enter your Address'  onChange={handlechange}  required/>    
                              </div>

                              <div className='mt-2 mb-2'>
                                  <input type='text' name='pincode' value={formvalue.pincode}
                                  className='form-control ' placeholder='Enter your Pincode'  onChange={handlechange} required/>    
                              </div>
                              <div className='mt-2 mb-2'>
                              <input type='text' name='contact' value={formvalue.contact}
                                  className='form-control ' placeholder='Enter your contact	'  onChange={handlechange} required/>    
                              </div>
                              <div className='mt-2 mb-2'>
                                  <input type='email' name='email' value={formvalue.email}
                                  className='form-control ' placeholder='Enter your Email'  onChange={handlechange}  required/>    
                              </div>

                              <div className='mt-2 mb-2'>
                                  <input type='password' name='password' value={formvalue.password}
                                  className='form-control ' placeholder='Enter your password'  onChange={handlechange} required/>    
                              </div>
                               
                             
  
                              <input type='submit'  className='btn btn-success' value='Submit'  /> 
                          </form>
  
                    </div>
              </div>
      </div>
    )
  }
  
  export default Reg_form
  