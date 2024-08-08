import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action) {
      const { id, email, password, groups, info } = action.payload;
      state[id] = { email, password, groups, info };
    },
    updateUser(state, action) {
      const { id, email, password, groups, info } = action.payload;
      if (state[id]) {
        state[id] = { ...state[id], email, password, groups, info };
      }
    },
    removeUser(state, action) {
      delete state[action.payload.id];
    },
    updateUserGroups(state, action) {
      const { userId, groups } = action.payload;
      if (state[userId]) {
        state[userId].groups = groups;
      }
    },
  },
});

export const { addUser, updateUser, removeUser, updateUserGroups } =
  usersSlice.actions;
export default usersSlice.reducer;
