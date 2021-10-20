import React from "react";
import { Map } from "./modules/map";
import "mapbox-gl/dist/mapbox-gl.css";
import { Sidebar } from "./modules/sidebar";

function App() {
  return (
    <div className="app-root">
      <Map />
      <Sidebar />
    </div>
  );
}

export default App;
