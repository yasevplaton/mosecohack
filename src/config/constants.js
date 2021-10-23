import { getNextTimestamp } from "../utils/date";

export const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoieWFzZXZwbGF0b24iLCJhIjoiY2poaTJrc29jMDF0YzM2cDU1ZnM1c2xoMiJ9.FhmWdHG7ar14dQv1Aoqx4A";

export const startTimeStamp = 1609372800;
export const endTimeStamp = getNextTimestamp(startTimeStamp, 47);
