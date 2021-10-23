import React, { useMemo, useState } from "react";
import MapGL, {
  CustomLayer,
  LanguageControl,
  Popup,
} from "@urbica/react-map-gl";
import { MapboxLayer } from "@deck.gl/mapbox";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { MAPBOX_ACCESS_TOKEN } from "../../config/constants";
import {
  useGridCoords,
  useGridValues,
  useStationsCoords,
  useStationsValues,
} from "../../api";
import { StationsLayer } from "./stations-layer";
import { useSelector } from "react-redux";
import { getSelectedParameter } from "../../root-slice/root-selectors";
import { getMatchedData, toGeoJSON } from "./utils";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./map.module.scss";

const alpha = 100;

function getMean(points) {
  return points.reduce((sum, p) => (sum += p.value), 0) / points.length;
}

// const AsyncGrid = withLoading(CustomLayer);
// const AsyncStationsLayer = withLoading(StationsLayer);

export const MapComponent = () => {
  const [viewport, setViewport] = useState({
    latitude: 55.7558,
    longitude: 37.6173,
    zoom: 9,
  });
  const [popupInfo, setPopupInfo] = useState({
    lat: 0,
    lon: 0,
    data: {},
  });
  const param = useSelector(getSelectedParameter);
  const { data: gridCoords } = useGridCoords();
  const { data: stationsCoords } = useStationsCoords();
  const stationsGeoJSON = useMemo(() => {
    if (!stationsCoords) return;

    return toGeoJSON(stationsCoords);
  }, [stationsCoords]);

  const { data: stationsValues, isLoading: isStationsLoading } =
    useStationsValues(!!param);
  const { data: gridValues, isLoading: isGridLoading } = useGridValues(!!param);

  const matchedStations = useMemo(() => {
    if (!stationsCoords || !stationsValues) return;

    return getMatchedData(stationsCoords, stationsValues, true);
  }, [stationsCoords, stationsValues]);

  const matchedGrid = useMemo(() => {
    if (!gridCoords || !gridValues) return;

    return getMatchedData(gridCoords, gridValues);
  }, [gridCoords, gridValues]);

  const isDataLoading = useMemo(
    () => isStationsLoading || isGridLoading,
    [isStationsLoading, isGridLoading]
  );

  const gridLayer = useMemo(() => {
    if (!matchedGrid) return;

    return new MapboxLayer({
      id: "grid",
      type: HexagonLayer,
      data: matchedGrid,
      pickable: true,
      radius: 1000,
      onClick: (item) => {
        const [lon, lat] = item.coordinate;
        setPopupInfo({
          lat,
          lon,
          data: item.object,
        });
      },
      colorRange: [
        [255, 255, 204, alpha],
        [199, 233, 180, alpha],
        [127, 205, 187, alpha],
        [65, 182, 196, alpha],
        [44, 127, 184, alpha],
        [37, 52, 148, alpha],
      ],
      getPosition: (d) => [d.lon, d.lat],
      getColorValue: getMean,
    });
  }, [matchedGrid]);

  return (
    <MapGL
      style={{ width: "100vw", height: "100vh", position: "relative" }}
      mapStyle="mapbox://styles/mapbox/light-v9"
      accessToken={MAPBOX_ACCESS_TOKEN}
      latitude={viewport.latitude}
      longitude={viewport.longitude}
      zoom={viewport.zoom}
      onViewportChange={setViewport}
    >
      <LanguageControl defaultLanguage="ru" />
      {isDataLoading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loading}>
            <CircularProgress color="secondary" />
          </div>
        </div>
      )}
      {stationsGeoJSON && (
        <StationsLayer
          data={matchedStations ? matchedStations : stationsGeoJSON}
        />
      )}
      {matchedGrid && matchedStations && (
        <CustomLayer layer={gridLayer} before="stations" />
      )}
      {popupInfo && (
        <Popup
          longitude={popupInfo.lon}
          latitude={popupInfo.lat}
          closeButton={false}
          closeOnClick={false}
        >
          <div>{popupInfo.data.colorValue}</div>
        </Popup>
      )}
    </MapGL>
  );
};
