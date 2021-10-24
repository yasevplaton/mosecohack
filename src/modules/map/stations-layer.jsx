import { Layer, Source } from "@urbica/react-map-gl";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setPopup } from "../../root-slice/root-slice";

export const StationsLayer = ({ data }) => {
  const dispatch = useDispatch();

  const onClick = useCallback(
    (e) => {
      if (e.features && e.features[0]) {
        const { lng: lon, lat } = e.lngLat;
        const { station_id } = e.features[0].properties;
        dispatch(
          setPopup({
            layer: "stations",
            lat,
            lon,
            data: station_id,
          })
        );
      }
    },
    [dispatch]
  );

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
          "circle-stroke-color": "black",
          "circle-stroke-width": 1,
        }}
        onClick={onClick}
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
