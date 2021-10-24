import { createSlice } from "@reduxjs/toolkit";
import { startTimeStamp } from "../config/constants";

const initialState = {
  parameter: "",
  timestampStart: startTimeStamp,
  popupInfo: {
    layer: "",
    lat: 0,
    lon: 0,
    data: null,
  },
  popupVisible: false,
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setParameter: (state, action) => {
      const { payload } = action;

      state.parameter = payload;
      state.popupVisible = false;
    },

    setTimestampStart: (state, action) => {
      const { payload } = action;

      state.timestampStart = payload;
      state.popupVisible = false;
    },

    setPopup: (state, action) => {
      const { payload } = action;

      const { layer, lat, lon, data } = payload;
      state.popupInfo = {
        layer,
        lat,
        lon,
        data,
      };
      state.popupVisible = true;
    },
  },
});

export const { setParameter, setTimestampStart, setPopup } = rootSlice.actions;

export const rootReducer = rootSlice.reducer;
