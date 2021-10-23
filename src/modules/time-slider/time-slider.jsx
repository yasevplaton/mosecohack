import Slider, { SliderTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./time-slider.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getTimeStampStart } from "../../root-slice/root-selectors";
import { endTimeStamp, startTimeStamp } from "../../config/constants";
import { getDate, getNextTimestamp } from "../../utils/date";
import { setTimestampStart } from "../../root-slice/root-slice";
import { useDebouncedCallback } from "use-debounce";
import { useMemo } from "react";

const { Handle } = Slider;

const middleTimestamp = getNextTimestamp(startTimeStamp, 24);

const MarkComp = ({ ts }) => {
  const [date, time] = useMemo(
    () => getDate(ts).formatForAPI().split("T"),
    [ts]
  );
  return (
    <div style={{ minWidth: "66px" }}>
      <div>{date}</div>
      <div>{time}</div>
    </div>
  );
};

const marks = {
  [startTimeStamp]: <MarkComp ts={startTimeStamp} />,
  [middleTimestamp]: <MarkComp ts={middleTimestamp} />,
  [endTimeStamp]: <MarkComp ts={endTimeStamp} />,
};

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${getDate(value).formatForAPI()} - ${getDate(
        getNextTimestamp(value)
      ).formatForAPI()}`}
      visible={dragging}
      placement="top"
      key={index}
      included={false}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

export const TimeSlider = () => {
  const tsStart = useSelector(getTimeStampStart);
  const dispatch = useDispatch();

  const onChange = useDebouncedCallback((ts) => {
    dispatch(setTimestampStart(ts));
  }, 300);

  return (
    <div className={styles.container}>
      <Slider
        min={startTimeStamp}
        max={endTimeStamp}
        defaultValue={tsStart}
        step={3600}
        handle={handle}
        onChange={onChange}
        marks={marks}
        trackStyle={{
          background: "none",
        }}
      />
    </div>
  );
};
