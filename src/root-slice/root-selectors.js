import { createSelector } from "@reduxjs/toolkit";

const getRootState = (state) => state.root;

export const getSelectedParameter = createSelector(
  getRootState,
  (state) => state.parameter
);

export const getTimeStampStart = createSelector(
  getRootState,
  (state) => state.timestampStart
);

export const getPopupInfo = createSelector(
  getRootState,
  (state) => state.popupInfo
);

export const getPopupVisible = createSelector(
  getRootState,
  (state) => state.popupVisible
);
