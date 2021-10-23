import { createSlice } from "@reduxjs/toolkit";
import { startTimeStamp } from "../config/constants";

const initialState = {
  parameter: "",
  timestampStart: startTimeStamp,
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setParameter: (state, action) => {
      const { payload } = action;

      state.parameter = payload;
    },

    setTimestampStart: (state, action) => {
      const { payload } = action;

      state.timestampStart = payload;
    },
  },
});

export const { setParameter, setTimestampStart } = rootSlice.actions;

export const rootReducer = rootSlice.reducer;
