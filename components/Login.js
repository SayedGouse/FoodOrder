import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {

    const initialvalue ={username:'', password:''}
    const [formvalue,setformvalue] = useState(initialvalue)
     const [loginStatus,setloginStatus] = useState('')

    const handlechange = (e)=>{
        const {name,value} = e.target
        setformvalue({...formvalue,[name]:value})
        console.log(formvalue.username)
        console.log(formvalue.password)
    }

    const signup=(e)=>{
        window.location="http://localhost:3000/reg_form";
    }
    const Formvalue =(e) =>{
        //alert("log")
        console.log(formvalue)
        //const logindata = JSON.stringify(formvalue)
        console.log(formvalue.username)
        e.preventDefault();
        axios.post("http://localhost:3001/login",{
            logindata:formvalue
        }).then((response)=>{
            
            console.log(response);
            if(response.data.length>0)
            {
                let utype=response.data[0].utype
                //console.log(response data)
                setloginStatus('')
                localStorage.setItem('user',formvalue.username)
                localStorage.setItem('log',utype)
                //window.location='http://localhost:3000/userhome';
                //console.log("valid")

                if(utype==='user')
                {
                    window.location='http://localhost:3000/userhome';
                }
                if(utype==='admin')
                {
                    window.location='http://localhost:3000/adminhome';
                }
            }
            else{
                //setloginStatus(response.data[0].username)
                setloginStatus('Sorry..! Invalid username or password')
            }
        })
        .catch(error => {
            console.log(error)
        })
    }


  return (
    <div>
        <div  className='container mt-2' style={{width:"700px"}}>
            <div className='row'>
                <div className='card'>
                    <div className='card-header'>
                        <h1>Login Now</h1>  
                    </div>
                    <div className='Card-body'>
                        <form onSubmit={Formvalue}>
                            <div className='mt-2 mb-3'>
                                <input type='email' value={formvalue.username} name='username'
                                className='form-control ' placeholder='Enter your username' onChange={handlechange} required/>    
                            </div>
                            <div>
                            <input type='password' value={formvalue.password} name='password'
                                className='form-control ' placeholder='Enter your password' onChange={handlechange} required/>    
                            </div>
                            <div>
                            <input type='submit'  className='btn btn-success mt-2 mb-3' value='Login'  /> 
                            </div>

                            <p>---------------------------OR--------------------------</p>

                            <div>
                            <input type='submit' onClick={signup} className='btn btn-warning mb-3' value='Sign up' /> 
                            </div>


                            <p><a href='/forgotpass' style={{textDecoration:'none'}}>ForgotPassword</a></p>
                        </form>
                        <p className='text-danger fs-2' >{loginStatus}</p>
                    </div>
                </div>
            </div>
        </div>   
    </div>
  )
}
export default Login


// import axios from 'axios'
// import React, { useState } from 'react'

// const Login = () => {
//   const initialValues = {username:"",password:""}
//   const [formValues,setFormvalues] = useState(initialValues)
//   const[loginStatus,setLoginStatus]=useState('')

//   const handleChange = (e) =>{
//     const {name,value}= e.target
//     setFormvalues({ ...formValues,[name]:value});
//     console.log(formValues.username)
// }

//   const FormLogin=(e)=>{
//     console.log(formValues)
//     //const logindata = JSON.stringify(formValues);
//     console.log(formValues.username)
//     e.preventDefault();
//     axios.post("http://localhost:3001/login",{
//      logindata:formValues
    
//     }).then((response)=>{
//       console.log(response);
//       if(response.data.length>0)
//       {
//         //console.log(response.data)
//         setLoginStatus('')
//         localStorage.setItem('user',formValues.username)
//         localStorage.setItem('log','users')
//         window.location = 'http://localhost:3000/userhome';
//         //console.log("valid")
//       }
//       else
//       {
//         //setLoginStatus(response.data[0].username)
//         setLoginStatus('Sorry..! Invalid Username or Password')
//       }
//     }) 
//     .catch(error => {
//       console.log(error)
//   }) 

//   }

//   return (
//     <div>
// <div className='container mt-2' style={{width:"700px"}}>
//             <div className='row'>
//                 <div className='card'>
//                     <div className='card-header'>
//                         <h1> Login Now</h1>
//                     </div>

//                     <div className='card-body'>
//                         <form onSubmit={FormLogin}>
//                         <div className='mb-3 mt-3'>
//                             <input type='email' value={formValues.username} name='username' className='form-control' placeholder='Enter your username' onChange={handleChange} required/> 
//                         </div>
 
//                         <div className='mb-3 mt-3'>
//                             <input type='password' value={formValues.password} name='password' className='form-control' placeholder='Enter your password' onChange={handleChange} required/>
                           
//                         </div>

//                         <input type='submit' className='btn btn-success' value='Login'/>

//                         </form>
//                         <p className='text-danger'> {loginStatus}</p>

//                         </div>
//                 </div>
//             </div>
//         </div>
      

       
      
//     </div>
//   )
// }

// export default Login

