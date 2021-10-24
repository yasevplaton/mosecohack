import styles from "./sidebar.module.scss";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedParameter } from "../../root-slice/root-selectors";
import { setParameter } from "../../root-slice";
import { Legend } from "../legend";
import React from "react";

const parameters = [
  { id: 1, name: "co" },
  { id: 2, name: "no2" },
  { id: 3, name: "no" },
  { id: 4, name: "pm10" },
  { id: 5, name: "pm25" },
];

export const Sidebar = () => {
  const param = useSelector(getSelectedParameter);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setParameter(event.target.value));
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>Выберите параметр</div>
      <FormControl sx={{ m: 1, minWidth: 200, marginLeft: 0 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Параметр
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={param}
          onChange={handleChange}
          label="Параметр"
        >
          <MenuItem value="">ОЧИСТИТЬ</MenuItem>
          {parameters.map((p) => {
            return (
              <MenuItem value={p.name} key={p.id}>
                {p.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {param && <Legend />}
    </div>
  );
};
