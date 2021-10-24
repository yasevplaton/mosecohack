import { useQuery } from "react-query";
import axios from "../../config/axios";
import { getDate, getNextTimestamp } from "../../utils/date";
import { useSelector } from "react-redux";
import {
  getSelectedParameter,
  getTimeStampStart,
} from "../../root-slice/root-selectors";
import { useMemo } from "react";

const getGridCoords = async () => {
  const data = await axios.get("/basenet");
  return data;
};

const getGridValues = async (param, tsStart, tsEnd) => {
  const formattedTsStart = getDate(tsStart).formatForAPI();
  const formattedTsEnd = getDate(tsEnd).formatForAPI();
  const data = await axios.get(
    `/net/${param}/${formattedTsStart}/${formattedTsEnd}`
  );
  return data;
};

export const useGridCoords = () => {
  return useQuery("grid-coords", () => getGridCoords());
};

export const useGridValues = (enabled) => {
  const param = useSelector(getSelectedParameter);
  const tsStart = useSelector(getTimeStampStart);
  const tsEnd = useMemo(() => {
    return getNextTimestamp(tsStart);
  }, [tsStart]);

  return useQuery(
    ["grid-values", param, tsStart],
    () => getGridValues(param, tsStart, tsEnd),
    { enabled }
  );
};
