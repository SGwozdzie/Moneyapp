import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "0",
    title: "Test",
    category: "icon",
    cost: 1,
    currency: "zloty",
    userId: "t123",
    userName: "tester",
    date: new Date("09-08-2024").toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit'
    }),
    hidden: true,
  },  {
    id: "1",
    title: "Test2",
    category: "icon",
    cost: 1.2,
    currency: "zloty",
    userId: "t123",
    userName: "tester",
    date: new Date("09-08-2024").toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit'
    }),
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
