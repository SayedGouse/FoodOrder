import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Displayreg = () => {

    const [reg,setreg]=useState([])

    useEffect(()=>{
        getuser();
      }, []);

      const getuser= async()=>{
        const result =await axios.get("http://localhost:3001/displayreg");
        setreg(result.data);
        console.log(result.data);
      }

      const deleteUser = id => {
        axios.delete(`http://localhost:3001/displayreg/delete/${id}`)
        .then (response => {
            getuser();
        });
      }

  return (
    <div>
      <div className='container mt-2'>
        <div className='row'>
          <h1>Total Users</h1>
            <table className='table table-striped table-bordered table-hover'>
                <thead className='bg-dark text-white'>
                    <th>#</th>
                    <th>fullname</th>
                    <th>city</th>
                    <th>address</th>
                    <th>pincode</th>
                    <th>contact</th>
                    <th>email</th>
                    <th>password</th>
                    <th colSpan={2}>Action</th>
                </thead>
                <tbody>
                { reg.map((val,key)=>{

               return(
                    <tr>
                        <td>{key + 1}</td>
                        <td>{val.fullname}</td>
                        <td>{val.city}</td>
                        <td>{val.address}</td>
                        <td>{val.pincode}</td>
                        <td>{val.contact}</td>
                        <td>{val.email}</td>
                        <td>{val.password}</td>
                        <td><button className='btn btn-primary' onClick={() => deleteUser(val.id)}>Delete</button></td>
                    </tr>
                       )
                    })
        
                  } 

                </tbody>
            </table>

        </div>

      </div>
    </div>
  )
}
export default Displayreg
