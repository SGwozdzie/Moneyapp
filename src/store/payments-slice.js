import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "0",
    category: "test",
    cost: 1,
    currency: "zloty",
    userId: "t123",
    userName: "tester",
    date: new Date("08-08-2024"),
    hidden: true,
  },
];

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    addPayment(state, action) {
      const { id, category, cost, currency, userId, userName, date } =
        action.payload;
      //   state[0] = { id, category, cost, currency, userId, userName, date, hidden };
    },
    sortDefault(state) {
      //by date
    },
    removePayment(state, action) {
      delete state[action.payload.id];
    },
  },
});

export const { addPayment, sortDefault, removePayment } = paymentsSlice.actions;
export default paymentsSlice.reducer;
