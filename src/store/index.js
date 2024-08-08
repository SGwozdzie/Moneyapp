import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth-slice";
import usersReducer from "./users-slice";
import paymentsReducer from "./payments-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    payments: paymentsReducer,
  },
});

export default store;
