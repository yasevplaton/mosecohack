import { getNextTimestamp } from "../utils/date";

export const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoieWFzZXZwbGF0b24iLCJhIjoiY2poaTJrc29jMDF0YzM2cDU1ZnM1c2xoMiJ9.FhmWdHG7ar14dQv1Aoqx4A";

export const startTimeStamp = 1609372800;
export const endTimeStamp = getNextTimestamp(startTimeStamp, 47);

export const colorRange = [
  [255, 255, 217],
  [237, 248, 177],
  [199, 233, 180],
  [127, 205, 187],
  [65, 182, 196],
  [29, 145, 192],
  [34, 94, 168],
  [37, 52, 148],
  [8, 29, 88],
];
