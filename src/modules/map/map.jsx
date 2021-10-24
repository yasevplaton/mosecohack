import React, { useMemo, useState } from "react";
import MapGL, { CustomLayer, LanguageControl } from "@urbica/react-map-gl";
import { MapboxLayer } from "@deck.gl/mapbox";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { colorRange, MAPBOX_ACCESS_TOKEN } from "../../config/constants";
import {
  useGridCoords,
  useGridValues,
  useStationsCoords,
  useStationsValues,
} from "../../api";
import { StationsLayer } from "./stations-layer";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopupVisible,
  getSelectedParameter,
} from "../../root-slice/root-selectors";
import { getMatchedData, toGeoJSON } from "./utils";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./map.module.scss";
import { MapPopup } from "../map-popup";
import { setPopup } from "../../root-slice/root-slice";

export const MapComponent = () => {
  const [viewport, setViewport] = useState({
    latitude: 55.7558,
    longitude: 37.6173,
    zoom: 9,
  });
  const param = useSelector(getSelectedParameter);
  const popupVisible = useSelector(getPopupVisible);
  const { data: gridCoords } = useGridCoords();
  const { data: stationsCoords } = useStationsCoords();

  const dispatch = useDispatch();

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
      radius: 600,
      onClick: (item) => {
        const [lon, lat] = item.coordinate;
        dispatch(
          setPopup({
            layer: "grid",
            lon,
            lat,
            data: item.object,
          })
        );
      },
      opacity: 0.5,
      colorRange: colorRange,
      getPosition: (d) => [d.lon, d.lat],
      getColorValue: (points) =>
        points.reduce((sum, p) => (sum += p.value), 0) / points.length,
    });
  }, [matchedGrid, dispatch]);

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
      {gridLayer && <CustomLayer layer={gridLayer} before="stations" />}
      {param && popupVisible && <MapPopup />}
    </MapGL>
  );
};
