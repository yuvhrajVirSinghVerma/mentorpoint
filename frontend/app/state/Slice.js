import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  TotalChats: 0,
};

const Slice = createSlice({
  name: "TotalChatscnt",
  initialState,
  reducers: {
    TotalChatscnt: (state, action) => {
      console.log("action ", action,"state : ",state,state.TotalChats);
      state.TotalChats = action.payload;
    },
  },
});

export const { TotalChatscnt } = Slice.actions;
export default Slice
