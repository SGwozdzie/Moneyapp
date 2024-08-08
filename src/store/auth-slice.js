import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  id: "",
  activeGroup: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.id = action.payload.id;
    },
    accessGroup(state, action) {
      const { groupId } = action.payload;
      state.activeGroup = groupId;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.id = "";
      state.activeGroup = "";
      state.groupLink = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
