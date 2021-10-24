import { Chart } from "../../components/chart";
import { withLoading } from "../withLoading";
import { useStationData } from "../../api";
import styles from "./station-popup.module.scss";
import { useSelector } from "react-redux";
import { getSelectedParameter } from "../../root-slice/root-selectors";

const AsyncChart = withLoading(Chart);

export const StationPopup = ({ stationId }) => {
  const { data, status } = useStationData(stationId, !!stationId);
  const param = useSelector(getSelectedParameter);

  return (
    <div className={styles.container}>
      <AsyncChart status={status} data={data} YLabel={`${param}, мг/м3`} />
    </div>
  );
};
