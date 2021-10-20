import { createSlice } from "@reduxjs/toolkit";
import { getNextTimestamp } from "../utils/date";

const initialState = {
  parameter: "",
  timestampStart: 1609372800,
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setParameter: (state, action) => {
      const { payload } = action;

      state.parameter = payload;
      state.timestampStart = initialState.timestampStart;
      state.timestampEnd = initialState.timestampEnd;
    },

    setTimestampStart: (state, action) => {
      const { payload } = action;

      state.timestampStart = payload;
      state.timestampEnd = getNextTimestamp(payload);
    },
  },
});

export const { setParameter } = rootSlice.actions;

export const rootReducer = rootSlice.reducer;
