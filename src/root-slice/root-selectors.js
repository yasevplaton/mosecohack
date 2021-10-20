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
