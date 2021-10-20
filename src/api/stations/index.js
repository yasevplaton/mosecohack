import { useQuery } from "react-query";
import axios from "../../config/axios";
import { useSelector } from "react-redux";
import {
  getSelectedParameter,
  getTimeStampStart,
} from "../../root-slice/root-selectors";
import { getDate, getNextTimestamp } from "../../utils/date";
import { useMemo } from "react";

const getStationsCoords = async () => {
  const data = await axios.get("/stations");
  return data;
};

const getStationsValues = async (param, tsStart, tsEnd) => {
  const formattedTsStart = getDate(tsStart).formatForAPI();
  const formattedTsEnd = getDate(tsEnd).formatForAPI();
  const data = await axios.get(
    `/stations/${param}/${formattedTsStart}/${formattedTsEnd}`
  );
  return data;
};

export const useStationsCoords = () => {
  return useQuery("stations-coords", () => getStationsCoords());
};

export const useStationsValues = (enabled) => {
  const param = useSelector(getSelectedParameter);
  const tsStart = useSelector(getTimeStampStart);
  const tsEnd = useMemo(() => {
    return getNextTimestamp(tsStart, 1);
  }, [tsStart]);

  return useQuery(
    ["stations-values", param, tsStart, tsEnd],
    () => getStationsValues(param, tsStart, tsEnd),
    { enabled }
  );
};
