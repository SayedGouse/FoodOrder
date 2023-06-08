import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Addfooddisplay = () => {

    const [foodlist,setfoodlist]=useState([])

   useEffect(()=>{
      getfood();
    }, []);
  
    const getfood= async()=>{
      const result =await axios.get("http://localhost:3001/addfooddisplay");
      setfoodlist(result.data);
      console.log(result.data);
    }

    const deleteUser = id => {
      axios.delete(`http://localhost:3001/addfooddisplay/delete/${id}`)
      .then (response => {
          getfood();
      });
    }
  return (
    <div>
      <div className='container mt-2'>
        <div className='row'>
            <table className='table table-striped table-border'>
                <thead className='bg-dark text-white'>
                    <th>#</th>
                    <th>category</th>
                    <th>item_name</th>
                    <th>uom</th>
                    <th>qty</th>
                    <th>price</th>
                    <th>image</th>
                    <th>Action</th>
                  
                </thead>
                <tbody>
                {foodlist.map((val,key)=>{

               return(
                    <tr>
                        <td>{key + 1}</td>
                        <td>{val.category}</td>
                        <td>{val.item_name}</td>
                        <td>{val.uom}</td>
                        <td>{val.qty}</td>
                        <td>{val.price}</td>
                        <td><img  src={`../upload/${val.image}`} alt='not found' width={100} height={100} /></td>
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

export default Addfooddisplay
