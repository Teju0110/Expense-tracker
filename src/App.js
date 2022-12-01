import './App.css';
import ExpenseTracker from './Components/ExpenseTracker';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import AddExpense from './Components/AddExpense';
import {ToastContainer} from 'react-toastify'
import EditExpense from './Components/EditExpense';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ExpenseTracker/>}/>
        <Route path='/add' element={<AddExpense/>}/>
        <Route path='/edit/:id' element={<EditExpense/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
