import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  //   loading: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload || "";
    },
    // setLoading(state, value) {
    //   state.loading = value.payload;
    // },
    setToken(state, value) {
      state.token = value.payload;
    },
    logout(state) {
      state.signupData = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setSignupData, setToken, logout } = authSlice.actions;

export default authSlice.reducer;
