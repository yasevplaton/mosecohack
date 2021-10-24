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

const getStationData = async (stationId) => {
  const data = await axios.get(
    `/station/${stationId}/2020-12-31T00:00/2021-01-02T00:00`
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

export const useStationData = (stationId, enabled = true) => {
  const param = useSelector(getSelectedParameter);
  return useQuery(
    ["station-data", stationId],
    () => getStationData(stationId),
    {
      enabled,
      select: (data) => {
        return data.map((item) => {
          return {
            datetime: getDate(item.datetime).formatForAPI(),
            value: +item[param],
          };
        });
      },
    }
  );
};
