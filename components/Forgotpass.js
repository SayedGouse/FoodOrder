// import axios from 'axios'
// import React, { useState } from 'react'

// const Forgotpass = () => {
//         const[email,setemail]=useState('')
//         const[status,setstatus]=useState('')

//         const handleChange=(e)=>{
//             //const{name,value}=e.target
//             setemail(e.target.value);
//             console.log(e.target.value)

//         }

//         const submitforgotenpassword=(e)=>{
//             //console.log(formvalue.username)
//             e.preventDefault();
//             axios.post("http://localhost:3001/forgotpass/",{
//                 email:email
//             }).then((response)=>{
//                 console.log(response);
//                 if(response.data.length>0)
//                 {
//                     localStorage.setItem('user',email)
//                     window.location="http://localhost:3000/otp/"
//                 }
//                 else
//                 {
//                     setstatus('Sorry..! invalid Email')
//                 }
//             }).catch(error=>{
//                 console.log(error)
//             })
//         }
    
//   return (
//     <div>
//       <div className='container'>
//         <div className='row'>
//             <div className='card' style={{width:'500px'}}>
//                 <div className='card-header'>
//                     <h1>ForgotPassword</h1>
//                 </div>
                
//                 <div className='card-body'>
//                 <form onSubmit={submitforgotenpassword}>
//                     <div>
//                     <input type='email' className='form-control' placeholder='Enter your Email' value={email} onChange={handleChange} required/>
//                     </div>

//                     {/* <input type='submit' className='btn btn-primary'><a href='/resetpass' style={{textDecoration:'none',color:'white'}}>Submit</a></input> */}
//                         <div>
//                     <input type='submit' className='btn btn-success' value='forgotp'/>
//                         </div>
//                  </form>

//                  <p className='text-danger'>{status}</p>

//                 </div>

//                 <input type='submit' className='btn btn-primary'><a href='/login' style={{textDecoration:'none',color:'white'}}>Go back</a></input> 
//             </div>

//         </div>

//       </div>
//     </div>
//   )
// }

// export default Forgotpass



import React, { useState } from 'react'
import axios from 'axios';

const Forgotpass = () => {
    const [email,setEmail] = useState('')
    const[status,setStatus] = useState('')
    
    const handleChange = (e) =>{
        setEmail(e.target.value);
        console.log(e.target.value)
    }
    
    const FormSubmitForgetPassword=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/forgotpass",{
            email:email
        
        }).then((response)=>{
            console.log(response);
            //console.log("Got the Data")
            if(response.data.length>0)
            {
                localStorage.setItem('user',email)
                window.location = 'http://localhost:3000/otp/';
            }
            else
            {
                setStatus('Sorry..! Invalid Email')
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

  return (
    <div className='container mt-2' style={{width:"700px"}}>
        <div className='row'>
            <div className='card'>
                <div className='card-header'>
                    <h1> Forget Password </h1>
                </div>

                <div className='card-body'>
                    <form onSubmit={FormSubmitForgetPassword}>
                        <div className='mb-3 mt-3'>
                            <input type='email' value={email} name='email' className='form-control' placeholder='Enter your email' onChange={handleChange} required/> 
                        </div>

                        <input type='submit' className='btn btn-success' value='Forgetpass'/>
                    </form>

                    <p className='text-danger'> {status} </p>
                </div>
                <p className='text-primary'> <a href='/login/' style={{textDecoration:"none"}}>Go Back</a></p>
            </div>
        </div>
    </div>
  )
}

export default Forgotpass




