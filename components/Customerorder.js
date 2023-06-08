import React, { useEffect, useState } from 'react'
import axios from 'axios';


const uid=localStorage.getItem('user')


const Customerorder = () => {

    const [MyOrderList, setMyOrderList] = useState([])

    useEffect(() => { 
        getMyOrders();   
      }, []);
  
      const getMyOrders = async() => {
        const result = await axios.get(`http://localhost:3001/customerorder/${uid}`);
        setMyOrderList(result.data);
        console.log(result.data);
      };

      const confirmOrder = id => {
        alert(id)
        axios.post(`http://localhost:3001/orderconfirm/${id}`)
        .then(response => {
        getMyOrders();
        
        });
      }

      
    const deleteUser = id => {
      axios.delete(`http://localhost:3001/fooddisplay/delete/${id}`)
      .then (response => {
        getMyOrders()
      });
    }

  return (
    <div>
       <div className='container mt-2 '>
            <div className='row'>
                <h1 className='mt-3'> My Order Details</h1>
                <table className='table table-bordered table-striped table-hover mt-3'>
                    <thead className='table-success'>
                        <tr>
                            <th>#</th>
                            <th> Product Name</th>
                            <th> Qty</th>
                            <th> Price </th>
                            <th> Total </th>
                            <th> Order Date</th>
                            <th> Order Time </th>
                            <th> Order Status </th>
                            <th> payment Status </th>
                            <th colSpan={2} align='center' className='text-white bg-danger'> Action </th>
                        </tr>
                    </thead>

                    <tbody> 
                    {
                      MyOrderList.map((mo,index) => {
                        let message
                        if(mo.order_status==="Confirmed"){

                          if(mo.payment_status==="paid")
                          {
                            message=<div className='text-primary fs-4 fw-bold'>paid</div>
                          }
                      else{
                            message = <div className='text-primary fs-4 fw-bold'> <a href={`/paybill/${mo.id}/${mo.total}`} style={{textDecoration:"none"}}> Pay Now </a> </div>
                          }
                        
                        }
                        else
                        {
                            message = <div><button className='btn btn-info text-white' onClick={() => confirmOrder(mo.id)}> Confirm Order </button></div>  
                        }
                      
            return(    
           <tr key={index}>
              <td>{index+1}</td>
              <td>{mo.item_name}</td>
              <td>{mo.qty}</td>
              <td>{mo.price}</td>
              <td>₹{mo.total}</td>
              <td>{mo.order_date}</td>
              <td>{mo.order_time}</td>
              <td className='text-success fs-4 fw-bold'>{mo.order_status}</td>
              <td>{mo.payment_status}</td>
              <td><i className='fa fa-trash fz-3' onClick={() => deleteUser(mo.id)}> </i> </td>
              <td><p>{message}</p></td>
            </tr>
        
            )
            }
              )}
                         
                    </tbody>

                </table>
            </div>
        </div>
    </div>
  )
}

export default Customerorder
