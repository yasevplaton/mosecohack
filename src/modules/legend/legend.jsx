import styles from "./legend.module.scss";
import { colorRange } from "../../config/constants";

export const Legend = () => {
  return (
    <div className={styles.root}>
      <div className={styles.legendBlockContainer}>
        <div className={styles.legendBlockTitle}>Концентрация</div>
        <div className={styles.colorRampContainer}>
          <div className={styles.colorRampContent}>
            <div className={styles.colorRampLabel}>низкая</div>
            <div
              className={styles.colorRamp}
              style={{
                background: `linear-gradient(90deg, rgb(${colorRange[0]}), rgb(${colorRange[1]}), rgb(${colorRange[2]}), rgb(${colorRange[3]}), rgb(${colorRange[4]}), rgb(${colorRange[5]}), rgb(${colorRange[6]}), rgb(${colorRange[7]}), rgb(${colorRange[8]}))`,
              }}
            />
            <div className={styles.colorRampLabel}>высокая</div>
          </div>
        </div>
      </div>
    </div>
  );
};
