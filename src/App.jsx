import React from "react";
import { Map } from "./modules/map";
import "mapbox-gl/dist/mapbox-gl.css";
import { Sidebar } from "./modules/sidebar";
import { TimeSlider } from "./modules/time-slider";
import { useSelector } from "react-redux";
import { getSelectedParameter } from "./root-slice/root-selectors";

function App() {
  const param = useSelector(getSelectedParameter);
  return (
    <div className="app-root">
      <Map />
      <Sidebar />
      {param && <TimeSlider />}
    </div>
  );
}

export default App;
