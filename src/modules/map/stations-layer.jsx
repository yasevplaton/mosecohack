import { Layer, Source } from "@urbica/react-map-gl";
import React from "react";

export const StationsLayer = ({ data }) => {
  return (
    <>
      <Source id="stations" type="geojson" data={data} />
      <Layer
        id="stations"
        type="circle"
        source="stations"
        paint={{
          "circle-radius": 6,
          "circle-color": "#1978c8",
        }}
      />
      <Layer
        id="stations-label"
        type="symbol"
        source="stations"
        layout={{
          "text-field": ["get", "st_name"],
          "text-variable-anchor": ["bottom-left", "left", "bottom"],
          "text-radial-offset": 0.5,
          "text-justify": "auto",
        }}
      />
    </>
  );
};
