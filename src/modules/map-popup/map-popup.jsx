import { Popup } from "@urbica/react-map-gl";
import React from "react";
import { useSelector } from "react-redux";
import { getPopupInfo } from "../../root-slice/root-selectors";
import { StationPopup } from "../station-popup";

export const MapPopup = () => {
  const popupInfo = useSelector(getPopupInfo);
  const { lat, lon, layer, data } = popupInfo;
  return (
    <Popup
      longitude={lon}
      latitude={lat}
      closeButton={false}
      closeOnClick={false}
      maxWidth={"500px"}
    >
      {layer === "grid" ? (
        <div>{`${data.colorValue?.toFixed(3)} мг/м3`}</div>
      ) : (
        <StationPopup stationId={data} />
      )}
    </Popup>
  );
};
