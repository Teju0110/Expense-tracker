import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditExpense = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Expense = useSelector((state) => state);
  const currentExpense = Expense.find((expense) => expense.id === parseInt(id));  

  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(""); 

  const handleEdit = (e) => {
    e.preventDefault()
    if (!desc && !amount) {
      return toast.warning("Please fill in all fields");
    }

    const data = {
      id: currentExpense.id,
      desc,
      amount,
    };

    dispatch({ type: "EDIT_EXPENSE", payload: data });
    toast.success("Expense Edited Successfully !!");
    navigate("/");
  };

  useEffect(() => {
    if (currentExpense) {
      setDesc(currentExpense.desc);
      setAmount(currentExpense.amount);
    }
  }, [currentExpense]);

  return (
    <div className="add">
      {currentExpense ? (
        <>
          <div className="container">
            <input
              type="text"
              placeholder="Description"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <div className="btn">
              <button onClick={handleEdit}>Edit Transaction</button>
              <button style={{ marginLeft: "10px" }} onClick={()=>navigate('/')}>Cancel</button>
            </div>
          </div>
        </>
      ) : (
        <h1>OOPS !! Expense Not Exists</h1>
      )}
    </div>
  );
};

export default EditExpense;
