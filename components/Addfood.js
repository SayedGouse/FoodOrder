import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Addfood = () => {
    const initialvalue ={category:"",item_name:"",uom:"",qty:"",price:"",image:""}
    const [formvalue,setformvalue] =useState(initialvalue)
    const [file,setfile] = useState("")

    
    const [CatList, setCatList] = useState([])



    useEffect(() => { 
        getCategory();   
      }, []);
  
      const getCategory = async() => {
        const result = await axios.get("http://localhost:3001/categorylist");
        setCatList(result.data);
        console.log(result.data);
      };

    const handlechange =(e)=>{
        const {name,value}=e.target
        setformvalue({...formvalue,[name]:value});
        console.log(formvalue)
    }
    const addfood=(e)=>{
        e.preventDefault();
        var formdata = new FormData();
        formdata.append("file",file)
        formdata.append("category",formvalue.category)
        formdata.append("item_name",formvalue.item_name)
        formdata.append("uom",formvalue.uom)
        formdata.append("qty",formvalue.qty)
        formdata.append("price",formvalue.price)
        console.log(...formdata)
        const config ={
            headers:
            {
                "Content-Type":"multipart/formdata"
            }
        }
        

        axios.post("http://localhost:3001/addfooditems",
            formdata,config
        ).then((response)=>{
            console.log(response);
            alert("done")
            window.location="http://localhost:3000/adminhome"
    
        }).catch(error=>{
            console.log(error)
        })
            
        }

        const setimgfile=(e)=>{
            //console.log(e.target.file[0])
            setfile(e.target.files[0])
        }
  return (
    <div>
            <div  className='container mt-2'>
                   <div className='row'>
                    <h1>Add Your Food</h1>
                        <form onSubmit={addfood}>
                             <div className='mt-2 mb-2' >
                             <select name='category' className='form-control' defaultValue={formvalue.category} onChange={handlechange}>
                <option>--select category--</option>
                {
                CatList.map((cat,index) => {
                return(
                     
                <option key={cat.id} value={cat.category_name}>{cat.category_name}</option>
                )
                })
                }

            </select>
                            </div>
                            <div className='mt-2 mb-2'>
                            <input type='text' name='item_name' value={formvalue.item_name}
                                className='form-control' placeholder='Enter your item_name' onChange={handlechange} required/>    
                            </div>
                            <div className='mt-2 mb-2'>
                                <input type='text' name='uom' value={formvalue.uom}
                                className='form-control' placeholder='Enter your uom' onChange={handlechange} required/>    
                            </div>
                            <div className='mt-2 mb-2'>
                            <input type='number' name='qty' value={formvalue.qty} min={1}
                                className='form-control ' placeholder='Enter your qty' onChange={handlechange} required/>    
                            </div>
                            <div className='mt-2 mb-2'>
                                <input type='number' name='price' value={formvalue.price} max={800} min={60}
                                className='form-control' placeholder='Enter your price'onChange={handlechange}  required/>    
                            </div>
                            <div className='mt-2 mb-2'>
                            <input type='file' name='image'
                                className='form-control'  onChange={setimgfile} required/>    
                            </div>

                            <input type='submit'  className='btn btn-success' value='upload'/> 
                        </form>

                  </div>
            </div>
    </div>
  )
}

export default Addfood
