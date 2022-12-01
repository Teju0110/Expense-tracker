import React, { useEffect, useState } from "react";
import "./ExpenseTracker.css";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Popover } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

const ExpenseTracker = () => {
  const expense = useSelector((state) => state);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState();
  const [income, setIncome] = useState(20000);
  const [popup, setPopup] = useState(false);
  const [search,setSearch]=useState("")

  const handleSearch=()=>{
    return expense.filter((expenses)=>(
      expenses.desc.toLowerCase().includes(search)
    ))
  }

  const handleExpense = () => {
    var tExpene = 0;
    if (expense) {
      for (let i = 0; i < expense.length; i++) {
        tExpene = tExpene + parseInt(expense[i].amount);
      }
    }
    setTotalExpense(tExpene);
  };

  const handleBalance = () => {
    var inc = parseInt(income);
    var ex = parseInt(totalExpense);

    setBalance(inc - ex);
  };

  useEffect(() => {
    handleExpense()
    handleBalance()
  }, [expense,balance,totalExpense]);

  const open = Boolean(popup);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdd = () => {
    navigate("/add");
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_EXPENSE", payload: id });
    toast.success("Expense Deleted Successfully !!");
  };

  const handleIncome = () => {
    setPopup(true);
  };

  return (
    <div className="tracker">
      <h1>Expense Tracker</h1>
      <div className="balance">
        <h2>Balance: </h2>
        <h2 style={{color : balance>0 ? "green" : "red"}}> ₹{balance}</h2>
        <button onClick={handleAdd}>ADD</button>
      </div>
      <div className="items">
        <div className="income_item">
          <p>Expense</p>
          <h3 style={{ color: "red" }}>₹ {totalExpense}</h3>
        </div>
        <div className="income_item">
          <div className="income">
            <p>Income</p>
            <ModeIcon onClick={handleIncome} style={{cursor:"pointer"}}/>
            {popup && (
              <Popover
                open={open}
                popup={popup}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
              >
                <div className="popup">
                  <input
                    type="number"
                    placeholder="Enter Income.."
                    onChange={(e) => setIncome(e.target.value)}
                    style={{ backgroundColor: "white", outline: "none" }}
                  />
                  <DoneIcon
                    style={{ color: "green", fontSize: "35px" }}
                    onClick={() => setPopup(false)}
                  />
                </div>
              </Popover>
            )}
          </div>

          <h3 style={{ color: "green", marginTop: "-2px" }}>₹ {income}</h3>
        </div>
      </div>
      <h2>Transaction</h2>
      <input type="text" placeholder="Search" onChange={(e)=>setSearch(e.target.value)}/>
      <div className="trasactions">
        {handleSearch().map((transaction, id) => (
          <div className="trasactions_item" key={transaction.id}>
            <p style={{textAlign:"center", width:"100px"}}>{transaction.desc}</p>
            <h4>₹{transaction.amount}</h4>
            <div className="icons">
              <ModeIcon
                onClick={() => handleEdit(transaction.id)}
                style={{ color: "#1F51FF" }}
              />
              <DeleteIcon
                style={{ color: "red" }}
                onClick={() => handleDelete(transaction.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseTracker;
