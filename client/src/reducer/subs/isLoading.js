import { createSlice } from "@reduxjs/toolkit";

const reducerObject = {};
reducerObject["setLoading"] = (state, action) => state + 1;
reducerObject["setLoaded"] = (state, action) => state - 1;
reducerObject["clearLoading"] = (state, action) => 0;

const slice = createSlice({
  name: "isLoading",
  initialState: 0,
  reducers: reducerObject,
});

export const { setLoading, setLoaded, clearLoading } = slice.actions;
export default slice.reducer;
