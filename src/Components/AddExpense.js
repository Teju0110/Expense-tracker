import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './AddExpense.css'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const AddExpense = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const expense=useSelector(state=>state)

  const[desc,setDesc]=useState()
  const[amount,setAmount]=useState()
  
  const handleAdd=()=>{

    if(!desc && !amount){
      return toast.warning("Please fill in all fields");
    }

    const data={
      id: expense.length > 0 ? expense[expense.length - 1].id + 1 : 0,
      desc,
      amount
    };
    
    dispatch({type:"ADD_EXPENSE",payload:data})
    toast.success("Expense Added Successfully !!")
    navigate("/")
    
  }

  return (
    <div className='add'>
        <div className='container'>
            <input type="text" placeholder='Description' onChange={(e)=>{setDesc(e.target.value)}}/>
            <input type="number" placeholder='Amount' onChange={(e)=>{setAmount(e.target.value)}}/>
            <button onClick={handleAdd}>Add Transaction</button>
        </div>
    </div>
  )
}

export default AddExpense