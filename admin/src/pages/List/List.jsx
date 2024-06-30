import React, { useEffect, useState } from 'react'
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';


const List = () => {
  
  const url = "http://localhost:3000";
  const [list,setList] = useState([]);

  const fetechList =async () =>{
      const response = await axios.get(`${url}/api/food/list`);
      // console.log(response.data);
      if (response.data.succes) {
         setList(response.data.data);
      } else {
        toast.error("Error");
      }
  }

    const removeFood =async (foodId) =>{
      const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
      await fetechList();
      if (response.data.succes) {
        toast.success("Item deleted")
     } else {
       toast.error("Error");
     }
    }

  useEffect(()=>{
    fetechList();
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Food Lists</p>
      <div className="list-table">
        <div className="list-table-format tilte">
           <b>Image</b>
           <b>Name</b>
           <b>Category</b>
           <b>Price</b>
           <b>Action</b>
        </div>
        {
          list.map((item,i)=>{
               return (
                 <div key={i} className='list-table-format'>
                    <img src={`${url}/images/`+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>{item.price}</p>
                    <p onClick={() => removeFood(item._id)} className='cusor'>x</p>
                 </div>
               )
          })
        }
      </div>

    </div>
  )
}

export default List