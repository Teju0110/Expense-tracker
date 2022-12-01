const initialstate = [
  {
    id: 0,
    desc: "Travel",
    amount: 5000,
  },
  {
    id: 1,
    desc: "Food",
    amount: 3000,
  },
];

export const expenseTrackerReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      state = [...state, action.payload];
      return state;
    
    case "EDIT_EXPENSE":
        const updateState=state.map(expense=>expense.id === action.payload.id ? action.payload : expense)
        state=updateState;
        return state;
    
    case "DELETE_EXPENSE":
        const filterstate=state.filter(expense=>expense.id === action.payload ? null : expense)
        state=filterstate;
        return state

    default:
      return state;
  }
};
