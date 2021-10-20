import GeoJSON from "geojson";

export const getMatchedData = (data, values, convertToGeoJSON = false) => {
  const matched = [];
  for (let i = 0; i < data.length; i++) {
    const item = {
      ...data[i],
      ...values[i],
    };
    matched.push(item);
  }

  return convertToGeoJSON ? toGeoJSON(matched) : matched;
};

export const toGeoJSON = (data) => {
  return GeoJSON.parse(data, { Point: ["lat", "lon"] });
};
